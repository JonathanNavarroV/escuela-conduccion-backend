import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";
import { I18nService } from "nestjs-i18n";
import { DeleteResult, ILike, Repository, UpdateResult } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
	constructor(
		private readonly i18n: I18nService,
		@InjectRepository(User) private userRepository: Repository<User>,
	) {}

	/**
	 * Crea un nuevo usuario en la base de datos.
	 * Verifica si ya existe un usuario con el mismo email antes de crearlo.
	 * Hashea la contraseña y guarda el usuario.
	 * Retorna el usuario creado como una instancia de UserEntity, excluyendo la contraseña.
	 *
	 * @param createUserDto - Datos necesarios para crear el usuario.
	 * @returns Una promesa con el usuario creado sin la contraseña.
	 * @throws {ConflictException} Si el email ya está registrado.
	 */
	async create(createUserDto: CreateUserDto): Promise<User> {
		const userFound = await this.findOneByEmail(createUserDto.email);
		if (!!userFound) {
			throw new ConflictException(this.i18n.translate("users.already_exists"));
		}

		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

		const newUser = this.userRepository.create({
			...createUserDto,
			password: hashedPassword,
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
	async findAll(): Promise<User[]> {
		const users = await this.userRepository.find();

		return plainToInstance(User, users);
	}

	/**
	 * Busca usuarios cuyo nombre completo (nombre + apellidos) contiene el término de búsqueda,
	 * ignorando mayúsculas, minúsculas y tildes.
	 *
	 * @param searchTerm - Texto parcial para buscar en el nombre completo.
	 * @returns Una promesa que resuelve con un arreglo de usuarios que coinciden.
	 * @throws {NotFoundException} Si no se encuentra ningún usuario que coincida con el término.
	 */
	async searchByFullName(searchTerm: string): Promise<User[]> {
		const usersFound = await this.userRepository
			.createQueryBuilder("user")
			.where(
				`CONCAT(user.firstName, ' ', user.lastNameFather, ' ', user.lastNameMother) COLLATE Latin1_General_CI_AI LIKE :searchTerm`,
				{ searchTerm: `%${searchTerm}%` },
			)
			.getMany();

		return plainToInstance(User, usersFound);
	}

	/**
	 * Busca un usuario por su ID.
	 * Si se encuentra, retorna el usuario como una instancia de UserEntity, excluyendo la contraseña.
	 *
	 * @param id - ID del usuario (UUID).
	 * @returns Una promesa que resuelve con el usuario sin la contraseña.
	 * @throws {NotFoundException} Si no se encuentra un usuario con el ID proporcionado.
	 */
	async findOneById(id: string): Promise<User> {
		const userFound = await this.userRepository.findOne({
			where: {
				id,
			},
		});
		if (!userFound) {
			throw new NotFoundException(this.i18n.translate("users.not_found"));
		}

		return plainToInstance(User, userFound);
	}

	/**
	 * Busca un usuario por su correo electrónico.
	 *
	 * @param email - El correo electrónico del usuario a buscar.
	 * @returns Una promesa que resuelve con el usuario si se encuentra, o `null` si no existe
	 */
	async findOneByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				email,
			},
		});
	}

	/**
	 * Actualiza los datos de un usuario existente.
	 * Verifica que el usuario exista y que el nuevo email no esté en uso por otro usuario.
	 *
	 * @param id - ID del usuario a actualizar.
	 * @param updateUserDTO - Datos a actualizar.
	 * @returns Una promesa con el resultado de la operación.
	 * @throws {NotFoundException} Si no se encuentra el usuario.
	 * @throws {ConflictException} Si el nuevo email ya está en uso por otro usuario.
	 */
	async update(
		id: string,
		updateUserDTO: UpdateUserDto,
	): Promise<UpdateResult> {
		const userFound = await this.userRepository.findOne({
			where: {
				id,
			},
		});
		if (!userFound) {
			throw new NotFoundException(this.i18n.translate("users.not_found"));
		}

		if (userFound.email !== updateUserDTO.email) {
			const userEmailFound = await this.findOneByEmail(updateUserDTO.email);
			if (!!userEmailFound) {
				throw new ConflictException(
					this.i18n.translate("users.already_exists"),
				);
			}
		}

		const updateResult = await this.userRepository.update(
			{ id },
			updateUserDTO,
		);

		return updateResult;
	}

	/**
	 * Elimina un usuario de la base de datos por su ID.
	 *
	 * @param id - ID del usuario a eliminar.
	 * @returns Una promesa con el resultado de la eliminación
	 * @throws {NotFoundException} Si el usuario no existe.
	 */
	async remove(id: string): Promise<DeleteResult> {
		const userFound = await this.userRepository.findOne({
			where: {
				id,
			},
		});
		if (!userFound) {
			throw new NotFoundException(this.i18n.translate("users.not_found"));
		}

		return this.userRepository.delete({ id });
	}
}
