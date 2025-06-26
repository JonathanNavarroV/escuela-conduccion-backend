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
	 * Crea un nuevo usuario en la base de datos.
	 *
	 * Descripción detallada:
	 * - Verifica si ya existe un usuario con el mismo email.
	 * - Valida el rol del usuario y sus sedes (branches).
	 *   - Un `SUPER_ADMIN` no debe tener branches.
	 *   - Un `BRANCH_ADMIN` debe tener al menos un branch válido.
	 * - Verifica la existencia de las sedes.
	 * - Hashea la contraseña y guarda el nuevo usuario.
	 *
	 * @param {CreateUserDto} createUserDto - Datos necesarios para crear el usuario: nombre, email, contraseña, rol y sedes.
	 *
	 * @returns {Promise<UserResponseDto>} Usuario creado y transformado al DTO de respuesta.
	 *
	 * @throws {ConflictException} Si ya existe un usuario con el mismo email.
	 * @throws {BadRequestException} Si el rol y branches están mal definidos.
	 * @throws {NotFoundException} Si alguna sede no existe.
	 *
	 * @example
	 * const newUser = await usersService.create({ email: 'test@mail.com', ... });
	 * console.log(user);
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
	 * Retorna todos los usuarios registrados en la base de datos.
	 *
	 * Descripción detallada:
	 * - Se devuelven ordenados por estado activo (`isActive`).
	 *
	 * @returns {Promise<UserResponseDto[]>} Arreglo con todos los usuarios existentes en el sistema.
	 *
	 * @example
	 * const users = await usersService.findAll();
	 * console.log(usuarios);
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
	 * Busca usuarios por coincidencia parcial en su nombre completo.
	 *
	 * Descripción detallada:
	 * - Combina nombre, apellido paterno y materno.
	 * - Ignora mayúsculas, minúsculas y tildes mediante `COLLATE`.
	 * - Ordena por estado activo y luego por nombre.
	 *
	 * @param {string} searchTerm - Texto parcial del nombre completo del usuario.
	 *
	 * @returns {Promise<UserResponseDto[]>} Arreglo con los usuarios que coinciden con el término.
	 *
	 * @example
	 * const results = await usersService.searchByFullName("Carlos");
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
	 * Busca un usuario por su ID único.
	 *
	 * Descripción detallada:
	 * - Devuelve un usuario si existe, transformado a su DTO correspondiente.
	 *
	 * @param {string} id - Identificador UUID del usuario.
	 *
	 * @returns {Promise<UserResponseDto>} Usuario encontrado con sus datos visibles.
	 *
	 * @throws {NotFoundException} Si no se encuentra ningún usuario con el ID dado.
	 *
	 * @example
	 * const user = await usersService.findOneById("123e4567-e89b-12d3-a456-426614174000");
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
	 * Busca un usuario por su correo electrónico.
	 *
	 * Descripción detallada:
	 * - Útil para validaciones como evitar duplicados o logins.
	 *
	 * @param {string} email - Correo electrónico del usuario a buscar.
	 *
	 * @returns {Promise<User | null>} Instancia de usuario si existe, o null.
	 *
	 * @example
	 * const found = await usersService.findOneByEmail("mail@ejemplo.com");
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
	 * Actualiza los datos de un usuario existente.
	 *
	 * Descripción detallada:
	 * - Verifica si el usuario existe.
	 * - Si cambia el email, valida duplicidad.
	 * - Aplica reglas de asignación de branches según el rol.
	 * - Hashea la nueva contraseña si es proporcionada.
	 * - Guarda los cambios y retorna el usuario actualizado.
	 *
	 * @param {string} id - ID del usuario a modificar.
	 * @param {UpdateUserDto} updateUserDTO - Datos a actualizar (parciales).
	 *
	 * @returns {Promise<UserResponseDto>} Usuario actualizado y transformado al DTO.
	 *
	 * @throws {NotFoundException} Si el usuario no existe.
	 * @throws {ConflictException} Si el nuevo email ya está en uso.
	 * @throws {BadRequestException} Si las reglas de branch según el rol no se cumplen.
	 *
	 * @example
	 * const updatedUser = await usersService.update("uuid", { email: "nuevo@mail.com" });
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
