import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageKeys } from "src/common/constants/message-keys.constant";
import { Repository } from "typeorm";
import { District } from "../locations/entities/district.entity";
import { CreateBranchDto, UpdateBranchDto } from "./dto/branch.dto";
import { Branch } from "./entities/branch.entity";

@Injectable()
export class BranchesService {
	public constructor(
		@InjectRepository(Branch) private branchRepository: Repository<Branch>,
		@InjectRepository(District)
		private districtRepository: Repository<District>,
	) {}

	/**
	 * Crea una nueva sede en la base de datos.
	 * Verifica si ya existe una sede con el mismo nombre antes de crearlo.
	 * Retorna la sede creada como una instancia de UserEntity.
	 *
	 * @param createBranchDto - Datos necesarios para crear la sede.
	 * @returns Una promesa con la sede creada.
	 *
	 * @throws {ConflictException} Si el nombre ya está registrado.
	 */
	public async create(createBranchDto: CreateBranchDto): Promise<Branch> {
		const branchFound = await this.findOneByName(createBranchDto.name);
		if (!!branchFound) {
			throw new ConflictException({
				messageKey: MessageKeys.BRANCH.ALREADY_EXIST,
			});
		}

		const districtFound = await this.findDistrictById(
			createBranchDto.districtId,
		);
		if (!districtFound) {
			throw new NotFoundException({
				messageKey: MessageKeys.DISTRICT.NOT_FOUND,
			});
		}

		const newBranch = this.branchRepository.create(createBranchDto);
		const savedBranch = await this.branchRepository.save(newBranch);

		return savedBranch;
	}

	/**
	 * Retorna todas las sedes registradas en la base de datos, ordenadas por `isActive` (activos primero, luego inactivos).
	 *
	 * @returns Una promesa que resuelve con un arreglo de todas las sedes.
	 */
	public async findAll(): Promise<Branch[]> {
		const branches = await this.branchRepository.find({
			order: {
				isActive: "DESC",
			},
		});

		return branches;
	}

	/**
	 * Busca sedes cuyo nombre contiene el término de búsqueda,
	 * ignorando mayúsculas, minúsculas y tildes.
	 * Ordena primero por `isActive = true`, luego por nombre.
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
			.orderBy("branch.isActive", "DESC")
			.addOrderBy("branch.name", "ASC")
			.getMany();

		return branchFound;
	}

	/**
	 * Busca una sede por su ID.
	 * Si se encuentra, retorna la sede como una instancia de BranchEntity.
	 *
	 * @param id - ID de la sede (UUID).
	 * @returns Una promesa que resuelve con la sede.
	 *
	 * @throws {NotFoundException} Si no se encuentra una sede con el ID proporcionado.
	 */
	public async findOneById(id: string): Promise<Branch> {
		const branchFound = await this.branchRepository.findOne({
			where: {
				id,
			},
		});
		if (!branchFound) {
			throw new NotFoundException({ messageKey: MessageKeys.BRANCH.NOT_FOUND });
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
	 * Busca una comuna por su ID.
	 * Si se encuentra, retorna la comuna como una instancia de DistrictEntity.
	 *
	 * @param districtId - ID de la comuna (UUID).
	 * @returns Una promesa que resuelve con la comuna.
	 *
	 * @throws {NotFoundException} Si no se encuentra una comuna con el ID proporcionado.
	 */
	private async findDistrictById(districtId): Promise<District> {
		return this.districtRepository.findOne({
			where: {
				id: districtId,
			},
		});
	}

	/**
	 * Actualiza los datos de una sede existente.
	 *
	 * - Verifica si la sede existe.
	 * - Valida que el nuevo nombre no esté en uso por otra sede.
	 * - Reemplaza los datos de la sede existente con los nuevos.
	 *
	 * @param id - ID de la sede a actualizar.
	 * @param updateBranchDto - Datos a actualizar.
	 * @returns Una promesa con la sede actualizada.
	 *
	 * @throws {NotFoundException} Si no se encuentra la sede.
	 * @throws {ConflictException} Si el nuevo nombre ya está en uso por otra sede.
	 */
	public async update(
		id: string,
		updateBranchDto: UpdateBranchDto,
	): Promise<Branch> {
		const { name, ...rest } = updateBranchDto;

		const branchFound = await this.branchRepository.findOne({
			where: {
				id,
			},
		});
		if (!branchFound) {
			throw new NotFoundException({ messageKey: MessageKeys.BRANCH.NOT_FOUND });
		}

		// Validar si el nuevo nombre ya está en uso por otra sede
		if (name && branchFound.name !== name) {
			const branchNameFound = await this.findOneByName(updateBranchDto.name);
			if (!!branchNameFound) {
				throw new ConflictException({
					messageKey: MessageKeys.BRANCH.ALREADY_EXIST,
				});
			}

			branchFound.name = name;
		}

		// Actualización de campos
		Object.assign(branchFound, rest);

		const updateBranch = await this.branchRepository.save(branchFound);

		return updateBranch;
	}
}
