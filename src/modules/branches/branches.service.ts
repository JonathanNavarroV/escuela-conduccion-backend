import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateBranchDto, UpdateBranchDto } from "./dto/branch.dto";
import { Branch } from "./entities/branch.entity";

@Injectable()
export class BranchesService {
	public constructor(
		@InjectRepository(Branch) private branchRepository: Repository<Branch>,
	) {}

	/**
	 * Crea una nueva sede en la base de datos.
	 * Verifica si ya existe una sede con el mismo nombre antes de crearlo.
	 * Retorna la sede creada como una instancia de UserEntity.
	 *
	 * @param createBranchDto - Datos necesarios para crear la sede.
	 * @returns Una promesa con la sede creada.
	 * @throws {ConflictException} Si el nombre ya está registrado.
	 */
	public async create(createBranchDto: CreateBranchDto): Promise<Branch> {
		const branchFound = await this.findOneByName(createBranchDto.name);
		if (!!branchFound) {
			throw new ConflictException({
				messageKey: "branches.already_exist",
			});
		}

		const newBranch = this.branchRepository.create(createBranchDto);
		const savedBranch = await this.branchRepository.save(newBranch);

		return savedBranch;
	}

	/**
	 * Retorna todas las sedes registradas en la base de datos.
	 * Las sedes se retornan como instancias de UserEntity.
	 *
	 * @returns Una promesa que resuelve con un arreglo de todas las sedes.
	 */
	public async findAll(): Promise<Branch[]> {
		const branches = await this.branchRepository.find();

		return branches;
	}

	/**
	 * Busca sedes cuyo nombre contiene el término de búsqueda, ignorando mayúscula, minúsculo y tildes
	 *
	 * @param searchTerm - Texto parcial para buscar el nombre.
	 * @returns Una promesa que resuelve con un arreglo de sedes que coinciden.
	 */
	public async searchByName(searchTerm: string): Promise<Branch[]> {
		const branchFound = await this.branchRepository
			.createQueryBuilder("branch")
			.where(`branch.name COLLATE Latin1_General_CI_AI LIKE :searchTerm`, {
				searchTerm: `%${searchTerm}%`,
			})
			.getMany();

		return branchFound;
	}

	/**
	 * Busca una sede por su ID.
	 * Si se encuentra, retorna la sede como una instancia de UserEntity.
	 *
	 * @param id - ID de la sede (UUID).
	 * @returns Una promesa que resuelve con la sede.
	 * @throws {NotFoundException} Si no se encuentra una sede con el ID proporcionado.
	 */
	public async findOneById(id: string): Promise<Branch> {
		const branchFound = await this.branchRepository.findOne({
			where: {
				id,
			},
		});
		if (!branchFound) {
			throw new NotFoundException({ messageKey: "branches.not_found" });
		}

		return branchFound;
	}

	/**
	 * Busca una sede por su nombre.
	 *
	 * @param name - El nombre de la sede a buscar.
	 * @returns Una promesa que resuelve con la sede si se encuentra, o `null` si no existe
	 */
	private async findOneByName(name: string): Promise<Branch> {
		return this.branchRepository.findOne({
			where: {
				name,
			},
		});
	}

	/**
	 * Actualiza los datos de una sede existente.
	 * Verifica que la sede exista y que el nuevo nombre no esté en uso por otra sede.
	 *
	 * @param id - ID de la sede a actualizar.
	 * @param updateBranchDto - Datos a actualizar.
	 * @returns Una promesa con el resultado de la operación.
	 * @throws {NotFoundException} Si no se encuentra la sede.
	 * @throws {ConflictException} Si el nuevo nombre ya está en uso por otra sede.
	 */
	public async update(
		id: string,
		updateBranchDto: UpdateBranchDto,
	): Promise<UpdateResult> {
		const branchFound = await this.branchRepository.findOne({
			where: {
				id,
			},
		});
		if (!branchFound) {
			throw new NotFoundException({ messageKey: "branches.not_found" });
		}

		if (branchFound.name !== updateBranchDto.name) {
			const branchNameFound = await this.findOneByName(updateBranchDto.name);
			if (!!branchNameFound) {
				throw new ConflictException({ messageKey: "branches.already_exists" });
			}
		}

		const updateResult = await this.branchRepository.update(
			{ id },
			updateBranchDto,
		);

		return updateResult;
	}

	/**
	 * Elimina una sede de la base de datos por su ID.
	 *
	 * @param id - ID de la sede a eliminar.
	 * @returns Una promesa con el resultado de la eliminación.
	 * @throws {NotFoundException} Si la sede no existe.
	 */
	public async remove(id: string): Promise<DeleteResult> {
		const branchFound = await this.branchRepository.findOne({
			where: {
				id,
			},
		});
		if (!branchFound) {
			throw new NotFoundException({ messageKey: "branches.not_found" });
		}

		return this.branchRepository.delete({ id });
	}
}
