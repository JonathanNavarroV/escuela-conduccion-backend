import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageKeys } from "src/common/constants/message-keys.constant";
import {
	transformResponseArray,
	transformResponseSingle,
} from "src/common/helpers/transform-response.helper";
import { Repository } from "typeorm";
import { LocationsService } from "../locations/locations.service";
import { BranchResponseDto } from "./dto/branch-response.dto";
import { CreateBranchDto, UpdateBranchDto } from "./dto/branch.dto";
import { Branch } from "./entities/branch.entity";

@Injectable()
export class BranchesService {
	public constructor(
		@InjectRepository(Branch) private branchRepository: Repository<Branch>,
		private readonly locationService: LocationsService,
	) {}

	/**
	 * Crea una nueva sede en la base de datos.
	 *
	 * - Verifica si ya existe una sede con el mismo nombre antes de crearla.
	 * - Valida que la comuna asociada exista.
	 * - Guarda la nueva sede en la base de datos.
	 * - Retorna la sede creada como una instancia de BranchResponseDto.
	 *
	 * @param {CreateBranchDto} createBranchDto - Datos necesarios para crear la sede.
	 * @returns {Promise<BranchResponseDto>} Promesa que resuelve con la sede creada.
	 *
	 * @throws {ConflictException} Si el nombre ya está registrado.
	 * @throws {NotFoundException} Si la comuna asociada no existe.
	 *
	 * @example
	 * const newBranch = await branchesService.create(createBranchDto);
	 * console.log(newBranch.id);
	 *
	 * @async
	 */
	public async create(
		createBranchDto: CreateBranchDto,
	): Promise<BranchResponseDto> {
		const branchFound = await this.findOneByName(createBranchDto.name);
		if (!!branchFound) {
			throw new ConflictException({
				messageKey: MessageKeys.BRANCH.ALREADY_EXIST,
			});
		}

		const districtFound = await this.locationService.findDistrictById(
			createBranchDto.districtId,
		);
		if (!districtFound) {
			throw new NotFoundException({
				messageKey: MessageKeys.DISTRICT.NOT_FOUND,
			});
		}

		const newBranch = this.branchRepository.create(createBranchDto);
		const savedBranch = await this.branchRepository.save(newBranch);

		return transformResponseSingle(BranchResponseDto, savedBranch);
	}

	/**
	 * Obtiene todas las sedes registradas.
	 *
	 * - Las sedes se ordenan primero por estado activo (`isActive` DESC).
	 * - Retorna un arreglo de BranchResponseDto con las sedes encontradas.
	 *
	 * @returns {Promise<BranchResponseDto[]>} Promesa que resuelve con un arreglo de sedes.
	 *
	 * @example
	 * const branches = await branchesService.findAll();
	 * console.log(branches.length);
	 *
	 * @async
	 */
	public async findAll(): Promise<BranchResponseDto[]> {
		const branches = await this.branchRepository.find({
			order: {
				isActive: "DESC",
			},
		});

		return transformResponseArray(BranchResponseDto, branches);
	}

	/**
	 * Busca sedes cuyo nombre contiene el término de búsqueda ignorando mayúsculas y tildes.
	 *
	 * - El resultado se ordena por `isActive` descendente y nombre ascendente.
	 *
	 * @param {string} searchTerm - Texto parcial para buscar el nombre.
	 * @returns {Promise<BranchResponseDto[]>} Promesa con arreglo de sedes que coinciden.
	 *
	 * @example
	 * const matches = await branchesService.searchByName("maipú");
	 * console.log(matches);
	 *
	 * @async
	 */
	public async searchByName(searchTerm: string): Promise<BranchResponseDto[]> {
		const branchFound = await this.branchRepository
			.createQueryBuilder("branch")
			.where(`branch.name COLLATE Latin1_General_CI_AI LIKE :searchTerm`, {
				searchTerm: `%${searchTerm}%`,
			})
			.orderBy("branch.isActive", "DESC")
			.addOrderBy("branch.name", "ASC")
			.getMany();

		return transformResponseArray(BranchResponseDto, branchFound);
	}

	/**
	 * Busca una sede por su ID.
	 *
	 * - Si se encuentra, retorna la sede como una instancia de BranchResponseDto.
	 *
	 * @param {string} id - ID de la sede (UUID).
	 * @returns {Promise<BranchResponseDto>} Promesa que resuelve con la sede encontrada.
	 *
	 * @throws {NotFoundException} Si no existe una sede con el ID proporcionado.
	 *
	 * @example
	 * const branch = await branchesService.findOneById("uuid-branch-id");
	 * console.log(branch.name);
	 *
	 * @async
	 */
	public async findOneById(id: string): Promise<BranchResponseDto> {
		const branchFound = await this.branchRepository.findOne({
			where: {
				id,
			},
		});
		if (!branchFound) {
			throw new NotFoundException({ messageKey: MessageKeys.BRANCH.NOT_FOUND });
		}

		return transformResponseSingle(BranchResponseDto, branchFound);
	}

	/**
	 * Busca una entidad de sede por su ID sin transformación a DTO.
	 *
	 * @param {string} id - ID de la sede (UUID).
	 * @returns {Promise<Branch>} Promesa que resuelve con la entidad Branch.
	 *
	 * @throws {NotFoundException} Si no existe una sede con el ID proporcionado.
	 *
	 * @example
	 * const branchEntity = await branchesService.findOneEntityById("uuid-branch-id");
	 * console.log(branchEntity.name);
	 *
	 * @async
	 */
	public async findOneEntityById(id: string): Promise<Branch> {
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
	 * @param {string} name - Nombre de la sede.
	 * @returns {Promise<BranchResponseDto | null>} Promesa que resuelve con la sede o null si no existe.
	 *
	 * @example
	 * const branch = await branchesService.findOneByName("Maipú");
	 * if (branch) {
	 *   console.log(branch.name);
	 * }
	 *
	 * @async
	 */
	private async findOneByName(name: string): Promise<BranchResponseDto> {
		return this.branchRepository.findOne({
			where: {
				name,
			},
		});
	}

	/**
	 * Actualiza los datos de una sede existente.
	 *
	 * - Verifica que la sede exista.
	 * - Valida que el nuevo nombre no esté en uso por otra sede.
	 * - Actualiza y guarda los nuevos datos.
	 * - Retorna la entidad actualizada sin transformación.
	 *
	 * @param {string} id - ID de la sede a actualizar.
	 * @param {UpdateBranchDto} updateBranchDto - Datos para actualizar.
	 * @returns {Promise<BranchResponseDto>} Promesa con la sede actualizada.
	 *
	 * @throws {NotFoundException} Si no se encuentra la sede.
	 * @throws {ConflictException} Si el nombre ya está en uso por otra sede.
	 *
	 * @example
	 * const updatedBranch = await branchesService.update(id, updateBranchDto);
	 * console.log(updatedBranch.name);
	 *
	 * @async
	 */
	public async update(
		id: string,
		updateBranchDto: UpdateBranchDto,
	): Promise<BranchResponseDto> {
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

		return transformResponseSingle(BranchResponseDto, updateBranch);
	}
}
