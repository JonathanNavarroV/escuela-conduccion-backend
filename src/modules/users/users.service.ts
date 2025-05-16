import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { I18nService } from "nestjs-i18n";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
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
	 *
	 * @param createUserDto - Datos necesarios para crear el usuario.
	 * @returns Una promesa con el usuario creado.
	 * @throws {ConflictException} Si el email ya está registrado.
	 */
	async create(createUserDto: CreateUserDto): Promise<User> {
		const userFound = await this.findOneByEmail(createUserDto.email);
		if (!!userFound) {
			throw new ConflictException(this.i18n.translate("users.already_exists"));
		}

		const newUser = this.userRepository.create(createUserDto);
		return this.userRepository.save(newUser);
	}

	/**
	 * Retorna todos los usuarios registrados en la base de datos
	 *
	 * @returns Una promesa que resuelve con un arreglo de todos los usuarios.
	 */
	async findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	/**
	 * Busca un usuario por su ID
	 *
	 * @param id - ID del usuario (UUID).
	 * @returns Una promesa que resuelve con el usuario si se encuentra.
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

		return userFound;
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
	 * Verifica si el usuario existe y que el nuevo email no esté en uso por otro usuario.
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
