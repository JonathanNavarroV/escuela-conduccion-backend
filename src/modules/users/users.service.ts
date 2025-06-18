import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";
import { MessageKeys } from "src/common/constants/message-keys.constant";
import { Repository } from "typeorm";
import { BranchesService } from "../branches/branches.service";
import { Branch } from "../branches/entities/branch.entity";
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
	 * - Verifica si ya existe un usuario con el mismo email.
	 * - Valida el rol del usuario y sus sedes (branches):
	 *   - Si el rol es `SUPER_ADMIN`, no se deben asignar branches.
	 *   - Si el rol es `BRANCH_ADMIN`, se deben asignar uno o más branches válidos.
	 * - Valida la existencia de las sedes proporcionadas.
	 * - Hashea la contraseña antes de guardar al usuario.
	 * - Persiste el nuevo usuario en la base de datos.
	 * - Devuelve una instancia de `User`, excluyendo la contraseña gracias al decorador `@Exclude`.
	 *
	 * @param createUserDto - Datos necesarios para crear el usuario: nombre, email, contraseña, rol y sedes.
	 * @returns Una promesa que resuelve con el usuario creado (sin la contraseña).
	 *
	 * @throws {ConflictException} Si ya existe un usuario con el mismo email.
	 * @throws {BadRequestException} Si el rol y las sedes están en conflicto:
	 *   - `users.super_admin_should_not_have_branches` si se asignan branches a un `SUPER_ADMIN`.
	 *   - `users.branch_admin_requires_branches` si no se asignan branches a un `BRANCH_ADMIN`.
	 * @throws {NotFoundException} Si alguna de las sedes no existe.
	 */
	public async create(createUserDto: CreateUserDto): Promise<User> {
		const { email, password, role, branchIds } = createUserDto;

		const userFound = await this.findOneByEmail(email);
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
					this.branchesService.findOneById(id),
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

		// Convierte el objeto plano `savedUser` a una instancia de UserEntity, aplicando el decorado @Exclude para ocultar el campo password
		return plainToInstance(User, savedUser);
	}

	/**
	 * Retorna todos los usuarios registrados en la base de datos.
	 * Los usuarios se retornan como instancias de UserEntity, excluyendo la contraseña.
	 *
	 * @returns Una promesa que resuelve con un arreglo de todos los usuarios sin la contraseña.
	 */
	public async findAll(): Promise<User[]> {
		const users = await this.userRepository.find({
			order: {
				isActive: "DESC",
			},
		});

		return plainToInstance(User, users);
	}

	/**
	 * Busca usuarios cuyo nombre completo (nombre + apellidos) contiene el término de búsqueda, ignorando mayúsculas, minúsculas y tildes.
	 *
	 * @param searchTerm - Texto parcial para buscar en el nombre completo.
	 * @returns Una promesa que resuelve con un arreglo de usuarios que coinciden.
	 */
	public async searchByFullName(searchTerm: string): Promise<User[]> {
		const usersFound = await this.userRepository
			.createQueryBuilder("user")
			.where(
				`CONCAT(user.firstName, ' ', user.lastNameFather, ' ', user.lastNameMother) COLLATE Latin1_General_CI_AI LIKE :searchTerm`,
				{ searchTerm: `%${searchTerm}%` },
			)
			.orderBy("user.isActive", "DESC")
			.addOrderBy("user.name", "ASC")
			.getMany();

		return plainToInstance(User, usersFound);
	}

	/**
	 * Busca un usuario por su ID.
	 * Si se encuentra, retorna el usuario como una instancia de UserEntity, excluyendo la contraseña.
	 *
	 * @param id - ID del usuario (UUID).
	 * @returns Una promesa que resuelve con el usuario sin la contraseña.
	 *
	 * @throws {NotFoundException} Si no se encuentra un usuario con el ID proporcionado.
	 */
	public async findOneById(id: string): Promise<User> {
		const userFound = await this.userRepository.findOne({
			where: {
				id,
			},
		});
		if (!userFound) {
			throw new NotFoundException({ messageKey: MessageKeys.USER.NOT_FOUND });
		}

		return plainToInstance(User, userFound);
	}

	/**
	 * Busca un usuario por su correo electrónico.
	 *
	 * @param email - El correo electrónico del usuario a buscar.
	 * @returns Una promesa que resuelve con el usuario si se encuentra, o `null` si no existe
	 */
	public async findOneByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				email,
			},
		});
	}

	/**
	 * Actualiza los datos de un usuario existente.
	 *
	 * - Verifica si el usuario existe.
	 * - Valida que el nuevo email no esté registrado por otro usuario.
	 * - Valida y asocia las nuevas sedes (branches) si se proporcionan, según el rol del usuario.
	 *   - Un `branch_admin` debe tener al menos una sede asociada.
	 *   - Un `super_admin` no debe tener sedes asociadas.
	 * - Hashea la nueva contraseña si se proporciona.
	 * - Reemplaza los datos del usuario existente con los nuevos.
	 *
	 * @param id - ID del usuario a actualizar.
	 * @param updateUserDTO - Datos a actualizar, incluyendo opcionalmente una nueva contraseña y sedes.
	 * @returns Una promesa con el usuario actualizado, sin la contraseña.
	 *
	 * @throws {NotFoundException} Si el usuario no existe.
	 * @throws {ConflictException} Si el nuevo email ya está en uso por otro usuario.
	 * @throws {BadRequestException} Si las reglas de asociación de sedes no se cumplen según el rol.
	 * @throws {NotFoundException} Si alguna de las sedes no existe.
	 */
	public async update(id: string, updateUserDTO: UpdateUserDto): Promise<User> {
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
			const userEmailFound = await this.findOneByEmail(email);
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
				branchIds.map((id) => this.branchesService.findOneById(id)),
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

		return plainToInstance(User, updatedUser);
	}
}
