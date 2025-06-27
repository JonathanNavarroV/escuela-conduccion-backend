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
	 * Crea una nueva sucursal validando que no exista previamente y que el distrito asignado sea válido.
	 *
	 * Descripción detallada:
	 * - Verifica si ya existe una sucursal con el mismo nombre; si es así, lanza ConflictException.
	 * - Verifica que el distrito indicado exista; si no, lanza NotFoundException.
	 * - Crea la entidad sucursal con los datos proporcionados y la guarda en la base de datos.
	 * - Vuelve a consultar la sucursal creada incluyendo la relación con el distrito.
	 * - Retorna la sucursal transformada a BranchResponseDto para exponer solo los datos necesarios.
	 *
	 * @param {CreateBranchDto} createBranchDto - DTO con los datos para crear la sucursal.
	 *
	 * @returns {Promise<BranchResponseDto>} DTO con los datos de la sucursal creada, incluyendo su distrito.
	 *
	 * @throws {ConflictException} Cuando ya existe una sucursal con el mismo nombre.
	 * @throws {NotFoundException} Cuando no se encuentra el distrito asignado.
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

		const districtFound = await this.locationService.findDistrictEntityById(
			createBranchDto.districtId,
		);
		if (!districtFound) {
			throw new NotFoundException({
				messageKey: MessageKeys.DISTRICT.NOT_FOUND,
			});
		}

		const newBranch = this.branchRepository.create(createBranchDto);
		const savedBranch = await this.branchRepository.save(newBranch);

		// Buscar la sede y agregar la relación
		const savedWithRelations = await this.branchRepository.findOne({
			relations: ["district"],
			where: { id: savedBranch.id },
		});

		return transformResponseSingle(BranchResponseDto, savedWithRelations);
	}

	/**
	 * Obtiene todas las sedes ordenadas por estado activo de forma descendente.
	 *
	 * Descripción detallada:
	 * - Consulta todas las sedes en la base de datos.
	 * - Incluye la relación con el distrito (`district`) en cada sede.
	 * - Ordena los resultados para que las sedes activas aparezcan primero.
	 * - Transforma el resultado en un array de BranchResponseDto para exponer solo los campos necesarios.
	 *
	 * @returns {Promise<BranchResponseDto[]>} Array con las sedes transformadas en DTOs.
	 *
	 * @async
	 */
	public async findAll(): Promise<BranchResponseDto[]> {
		const branches = await this.branchRepository.find({
			relations: ["district"],
			order: {
				isActive: "DESC",
			},
		});

		return transformResponseArray(BranchResponseDto, branches);
	}

	/**
	 * Busca sedes cuyo nombre coincida parcialmente con el término de búsqueda.
	 *
	 * Descripción detallada:
	 * - Realiza una búsqueda insensible a mayúsculas, acentos y ordenamiento (COLLATE Latin1_General_CI_AI).
	 * - Filtra sedes cuyo nombre contenga el término proporcionado.
	 * - Incluye la relación con el distrito (`district`) en cada sede encontrada.
	 * - Ordena los resultados primero por sedes activas (descendente) y luego por nombre (ascendente).
	 * - Transforma el resultado en un array de BranchResponseDto para exponer solo los campos necesarios.
	 *
	 * @param {string} searchTerm - Texto para buscar dentro del nombre completo de la sede.
	 *
	 * @returns {Promise<BranchResponseDto[]>} Array con las sedes encontradas transformadas en DTOs, incluyendo su distrito.
	 *
	 * @async
	 */
	public async searchByName(searchTerm: string): Promise<BranchResponseDto[]> {
		const branchFound = await this.branchRepository
			.createQueryBuilder("branch")
			.leftJoinAndSelect("branch.district", "district")
			.where(`branch.name COLLATE Latin1_General_CI_AI LIKE :searchTerm`, {
				searchTerm: `%${searchTerm}%`,
			})
			.orderBy("branch.isActive", "DESC")
			.addOrderBy("branch.name", "ASC")
			.getMany();

		return transformResponseArray(BranchResponseDto, branchFound);
	}

	/**
	 * Busca una sede por su ID y retorna su información transformada.
	 *
	 * Descripción detallada:
	 * - Consulta la base de datos para encontrar una sede con el ID proporcionado.
	 * - Si no se encuentra, lanza una NotFoundException con un mensaje específico.
	 * - Si se encuentra, transforma la entidad a BranchResponseDto para exponer solo los datos necesarios.
	 *
	 * @param {string} id - Identificador único de la sede a buscar.
	 *
	 * @returns {Promise<BranchResponseDto>} DTO con los datos de la sede encontrada.
	 *
	 * @throws {NotFoundException} Cuando no existe una sede con el ID proporcionado.
	 *
	 * @async
	 */
	public async findOneById(id: string): Promise<BranchResponseDto> {
		const branchFound = await this.branchRepository.findOne({
			relations: ["district"],
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
	 * Busca una sucursal por su ID y retorna la entidad completa.
	 *
	 * Descripción detallada:
	 * - Consulta la base de datos para encontrar una sucursal con el ID proporcionado.
	 * - Si no se encuentra, lanza NotFoundException con un mensaje específico.
	 * - Si se encuentra, retorna la entidad Branch completa.
	 *
	 * @param {string} id - Identificador único de la sucursal a buscar.
	 *
	 * @returns {Promise<Branch>} Entidad Branch encontrada.
	 *
	 * @throws {NotFoundException} Cuando no existe una sucursal con el ID proporcionado.
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
	 * Busca una sucursal por su nombre y retorna la entidad correspondiente.
	 *
	 * Descripción detallada:
	 * - Realiza una consulta para encontrar una sucursal cuyo nombre coincida exactamente.
	 * - Incluye la relación con el distrito (`district`) en cada sede.
	 * - Retorna la entidad BranchResponseDto si se encuentra, o undefined si no existe.
	 *
	 * @param {string} name - Nombre de la sucursal a buscar.
	 *
	 * @returns {Promise<BranchResponseDto | undefined>} Entidad BranchResponseDto encontrada o undefined.
	 *
	 * @async
	 */
	private async findOneByName(name: string): Promise<BranchResponseDto> {
		return this.branchRepository.findOne({
			relations: ["district"],
			where: {
				name,
			},
		});
	}

	/**
	 * Actualiza los datos de una sucursal existente validando el nombre para evitar duplicados.
	 *
	 * Descripción detallada:
	 * - Busca la sucursal por ID; si no existe, lanza NotFoundException.
	 * - Si se proporciona un nuevo nombre distinto al actual, verifica que no esté en uso por otra sucursal; si está en uso, lanza ConflictException.
	 * - Actualiza los demás campos de la sucursal con los datos proporcionados.
	 * - Guarda la sucursal actualizada.
	 * - Vuelve a consultar la sucursal incluyendo la relación con el distrito.
	 * - Retorna la sucursal actualizada transformada a BranchResponseDto.
	 *
	 * @param {string} id - ID de la sucursal a actualizar.
	 * @param {UpdateBranchDto} updateBranchDto - DTO con los datos para actualizar la sucursal.
	 *
	 * @returns {Promise<BranchResponseDto>} DTO con los datos de la sucursal actualizada, incluyendo su distrito.
	 *
	 * @throws {NotFoundException} Cuando no se encuentra la sucursal por ID.
	 * @throws {ConflictException} Cuando el nuevo nombre ya está en uso por otra sucursal.
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

		await this.branchRepository.save(branchFound);

		// Buscar la sede y agregar la relación
		const updatedWithRelations = await this.branchRepository.findOne({
			relations: ["district"],
			where: { id },
		});

		return transformResponseSingle(BranchResponseDto, updatedWithRelations);
	}
}
