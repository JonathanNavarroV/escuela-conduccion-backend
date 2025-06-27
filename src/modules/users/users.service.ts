import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { MessageKeys } from "src/common/constants/message-keys.constant";
import {
	transformResponseArray,
	transformResponseSingle,
} from "src/common/helpers/transform-response.helper";
import { Repository } from "typeorm";
import { BranchesService } from "../branches/branches.service";
import { Branch } from "../branches/entities/branch.entity";
import { UserResponseDto } from "./dto/user-response.dto";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User, UserRole } from "./entities/user.entity";

@Injectable()
export class UsersService {
	public constructor(
		private readonly branchesService: BranchesService,
		@InjectRepository(User) private userRepository: Repository<User>,
	) {}

	/**
	 * Crea un nuevo usuario en el sistema validando su rol y asignación de sucursales.
	 *
	 * Descripción detallada:
	 * - Verifica si ya existe un usuario con el email proporcionado; si es así, lanza ConflictException.
	 * - Según el rol:
	 *   - Si es SUPER_ADMIN, valida que no se asignen sucursales (branchIds debe estar vacío o undefined).
	 *   - Si es BRANCH_ADMIN, valida que se asignen sucursales y obtiene sus entidades correspondientes.
	 * - Hashea la contraseña usando bcrypt con un salt de 10.
	 * - Crea la entidad usuario con los datos, la contraseña hasheada y las sucursales asignadas.
	 * - Guarda el usuario en la base de datos.
	 * - Retorna la respuesta transformada a UserResponseDto para exponer solo los datos necesarios.
	 *
	 * @param {CreateUserDto} createUserDto - DTO con los datos para crear el usuario, incluyendo email, password, rol y sucursales.
	 *
	 * @returns {Promise<UserResponseDto>} DTO con los datos del usuario creado.
	 *
	 * @throws {ConflictException} Cuando ya existe un usuario con el mismo email.
	 * @throws {BadRequestException} Cuando un SUPER_ADMIN tiene sucursales asignadas o un BRANCH_ADMIN no tiene sucursales.
	 *
	 * @async
	 */
	public async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
		const { email, password, role, branchIds } = createUserDto;

		const userFound = await this.findOneEntityByEmail(email);
		if (!!userFound) {
			throw new ConflictException({
				messageKey: MessageKeys.USER.ALREADY_EXIST,
			});
		}

		// Validar según rol del usuario
		let branches: Branch[] = [];

		if (role === UserRole.SUPER_ADMIN) {
			if (branchIds?.length) {
				throw new BadRequestException({
					messageKey: MessageKeys.USER.SUPER_ADMIN_SHOULD_NOT_HAVE_BRANCHES,
				});
			}
		} else if (role === UserRole.BRANCH_ADMIN) {
			if (!branchIds?.length) {
				throw new BadRequestException({
					messageKey: MessageKeys.USER.BRANCH_ADMIN_REQUIRES_BRANCHES,
				});
			}

			branches = await Promise.all(
				createUserDto.branchIds.map((id) =>
					this.branchesService.findOneEntityById(id),
				),
			);
		}

		// Procesar contraseña
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = this.userRepository.create({
			...createUserDto,
			password: hashedPassword,
			branches,
		});
		const savedUser = await this.userRepository.save(newUser);

		return transformResponseSingle(UserResponseDto, savedUser);
	}

	/**
	 * Obtiene todos los usuarios ordenados por estado activo de forma descendente.
	 *
	 * Descripción detallada:
	 * - Consulta todos los usuarios en la base de datos.
	 * - Ordena los resultados para que los usuarios activos aparezcan primero.
	 * - Transforma el resultado en un array de UserResponseDto para exponer solo los campos necesarios.
	 *
	 * @returns {Promise<UserResponseDto[]>} Array con los usuarios transformados en DTOs.
	 *
	 * @async
	 */
	public async findAll(): Promise<UserResponseDto[]> {
		const users = await this.userRepository.find({
			order: {
				isActive: "DESC",
			},
		});

		return transformResponseArray(UserResponseDto, users);
	}

	/**
	 * Busca usuarios cuyo nombre completo coincida parcialmente con el término de búsqueda.
	 *
	 * Descripción detallada:
	 * - Construye una consulta que concatena el primer nombre y ambos apellidos.
	 * - Realiza una búsqueda insensible a mayúsculas, acentos y ordenamiento (COLLATE Latin1_General_CI_AI).
	 * - Filtra usuarios cuyo nombre completo contenga el término proporcionado.
	 * - Ordena los resultados primero por usuarios activos (descendente) y luego por nombre (ascendente).
	 * - Transforma el resultado en un array de UserResponseDto para exponer solo los campos necesarios.
	 *
	 * @param {string} searchTerm - Texto para buscar dentro del nombre completo del usuario.
	 *
	 * @returns {Promise<UserResponseDto[]>} Array con los usuarios encontrados transformados en DTOs.
	 *
	 * @async
	 */
	public async searchByFullName(
		searchTerm: string,
	): Promise<UserResponseDto[]> {
		const usersFound = await this.userRepository
			.createQueryBuilder("user")
			.where(
				`CONCAT(user.firstName, ' ', user.lastNameFather, ' ', user.lastNameMother) COLLATE Latin1_General_CI_AI LIKE :searchTerm`,
				{ searchTerm: `%${searchTerm}%` },
			)
			.orderBy("user.isActive", "DESC")
			.addOrderBy("user.firstName", "ASC")
			.getMany();

		return transformResponseArray(UserResponseDto, usersFound);
	}

	/**
	 * Busca un usuario por su ID y retorna su información transformada.
	 *
	 * Descripción detallada:
	 * - Consulta la base de datos para encontrar un usuario con el ID proporcionado.
	 * - Si no se encuentra, lanza una NotFoundException con un mensaje específico.
	 * - Si se encuentra, transforma la entidad a UserResponseDto para exponer solo los datos necesarios.
	 *
	 * @param {string} id - Identificador único del usuario a buscar.
	 *
	 * @returns {Promise<UserResponseDto>} DTO con los datos del usuario encontrado.
	 *
	 * @throws {NotFoundException} Cuando no existe un usuario con el ID proporcionado.
	 *
	 * @async
	 */
	public async findOneById(id: string): Promise<UserResponseDto> {
		const userFound = await this.userRepository.findOne({
			where: {
				id,
			},
		});
		if (!userFound) {
			throw new NotFoundException({ messageKey: MessageKeys.USER.NOT_FOUND });
		}

		return transformResponseSingle(UserResponseDto, userFound);
	}

	/**
	 * Busca un usuario por su email y retorna la entidad completa.
	 *
	 * Descripción detallada:
	 * - Consulta la base de datos para encontrar un usuario con el email proporcionado.
	 * - Retorna la entidad User completa o `undefined` si no existe.
	 *
	 * @param {string} email - Email del usuario a buscar.
	 *
	 * @returns {Promise<User | undefined>} Entidad User encontrada o undefined si no existe.
	 *
	 * @async
	 */
	public async findOneEntityByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				email,
			},
		});
	}

	/**
	 * Actualiza los datos de un usuario existente, incluyendo validaciones por rol y manejo de sucursales.
	 *
	 * Descripción detallada:
	 * - Busca al usuario por ID; si no existe, lanza NotFoundException.
	 * - Si se proporciona un nuevo email distinto al actual, valida que no esté en uso; si está, lanza ConflictException.
	 * - Valida la asignación de sucursales según el rol actual:
	 *   - BRANCH_ADMIN debe tener al menos una sucursal asignada.
	 *   - SUPER_ADMIN no debe tener sucursales asignadas.
	 * - Si se envía contraseña nueva, la hashea antes de guardarla.
	 * - Actualiza los demás campos del usuario con los datos recibidos.
	 * - Guarda y retorna el usuario actualizado transformado a UserResponseDto.
	 *
	 * @param {string} id - ID del usuario a actualizar.
	 * @param {UpdateUserDto} updateUserDTO - DTO con los datos para actualizar del usuario.
	 *
	 * @returns {Promise<UserResponseDto>} DTO con los datos del usuario actualizado.
	 *
	 * @throws {NotFoundException} Cuando no se encuentra el usuario por ID.
	 * @throws {ConflictException} Cuando el nuevo email ya está en uso por otro usuario.
	 * @throws {BadRequestException} Cuando las sucursales asignadas no cumplen con las reglas del rol.
	 *
	 * @async
	 */
	public async update(
		id: string,
		updateUserDTO: UpdateUserDto,
	): Promise<UserResponseDto> {
		const { email, password, branchIds, ...rest } = updateUserDTO;

		const userFound = await this.userRepository.findOne({
			where: {
				id,
			},
		});
		if (!userFound) {
			throw new NotFoundException({ messageKey: MessageKeys.USER.NOT_FOUND });
		}

		// Validación de email en uso
		if (email && userFound.email !== email) {
			const userEmailFound = await this.findOneEntityByEmail(email);
			if (!!userEmailFound) {
				throw new ConflictException({
					messageKey: MessageKeys.USER.ALREADY_EXIST,
				});
			}

			userFound.email = email;
		}

		// Validar según rol del usuario
		const currentRole = userFound.role;
		let branches: Branch[] = [];

		if (!!branchIds) {
			if (currentRole === UserRole.BRANCH_ADMIN && branchIds.length === 0) {
				throw new BadRequestException({
					messageKey: MessageKeys.USER.BRANCH_ADMIN_REQUIRES_BRANCHES,
				});
			}

			if (currentRole === UserRole.SUPER_ADMIN && branchIds.length > 0) {
				throw new BadRequestException({
					messageKey: MessageKeys.USER.SUPER_ADMIN_SHOULD_NOT_HAVE_BRANCHES,
				});
			}

			branches = await Promise.all(
				branchIds.map((id) => this.branchesService.findOneEntityById(id)),
			);
		}

		// Procesar contraseña
		if (password) {
			userFound.password = await bcrypt.hash(password, 10);
		}

		// Actualización de campos
		Object.assign(userFound, rest);

		if (branches.length !== 0) {
			userFound.branches = branches;
		}

		const updatedUser = await this.userRepository.save(userFound);

		return transformResponseSingle(UserResponseDto, updatedUser);
	}
}
