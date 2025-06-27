import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageKeys } from "src/common/constants/message-keys.constant";
import { transformResponseArray } from "src/common/helpers/transform-response.helper";
import { Repository } from "typeorm";
import { DistrictResponseDto } from "./dto/district-response.dto";
import { LocationLevelResponseDto } from "./dto/location-level-response.dto";
import { ProvinceResponseDto } from "./dto/province-response.dto";
import { RegionResponseDto } from "./dto/region-response.dto";
import { Country } from "./entities/country.entity";
import { District } from "./entities/district.entity";
import { LocationLevel } from "./entities/location-level.entity";
import { Province } from "./entities/province.entity";
import { Region } from "./entities/region.entity";

@Injectable()
export class LocationsService {
	public constructor(
		@InjectRepository(LocationLevel)
		private locationLevelRepository: Repository<LocationLevel>,
		@InjectRepository(Country) private countryRepository: Repository<Country>,
		@InjectRepository(Region) private regionRepository: Repository<Region>,
		@InjectRepository(Province)
		private provinceRepository: Repository<Province>,
		@InjectRepository(District)
		private districtRepository: Repository<District>,
	) {}

	/**
	 * Obtiene los niveles de localización asociados al país configurado en la variable de entorno.
	 *
	 * Descripción detallada:
	 * - Lee el nombre del país desde la variable de entorno `SCHOOL_COUNTRY`.
	 * - Busca la entidad país correspondiente al nombre obtenido.
	 * - Si no encuentra el país, lanza NotFoundException.
	 * - Consulta los niveles de localización (location levels) asociados al ID del país encontrado.
	 * - Transforma y retorna los resultados como un array de LocationLevelResponseDto.
	 *
	 * @returns {Promise<LocationLevelResponseDto[]>} Array con los niveles de localización transformados.
	 *
	 * @throws {NotFoundException} Cuando no se encuentra el país configurado.
	 *
	 * @async
	 */
	public async findLocationLevels(): Promise<LocationLevelResponseDto[]> {
		const countryName = process.env.SCHOOL_COUNTRY;

		const country = await this.findCountryEntityByName(countryName);

		if (!country) {
			throw new NotFoundException({
				messageKey: MessageKeys.COUNTRY.NOT_FOUND,
			});
		}

		const locationLevelFound = await this.locationLevelRepository.find({
			where: {
				countryId: country.id,
			},
		});

		return transformResponseArray(LocationLevelResponseDto, locationLevelFound);
	}

	/**
	 * Obtiene todas las regiones asociadas al país configurado en la variable de entorno.
	 *
	 * Descripción detallada:
	 * - Lee el nombre del país desde la variable de entorno `SCHOOL_COUNTRY`.
	 * - Busca la entidad país correspondiente al nombre obtenido.
	 * - Si no encuentra el país, retorna un arreglo vacío.
	 * - Consulta las regiones asociadas a ese país, ordenadas alfabéticamente por nombre.
	 * - Transforma y retorna las regiones como un array de RegionResponseDto.
	 *
	 * @returns {Promise<RegionResponseDto[]>} Array con las regiones transformadas o vacío si no se encuentra el país.
	 *
	 * @async
	 */
	public async findAllRegions(): Promise<RegionResponseDto[]> {
		const countryName = process.env.SCHOOL_COUNTRY;

		const country = await this.findCountryEntityByName(countryName);

		if (!country) {
			return [];
		}

		const regionsFound = await this.regionRepository.find({
			where: {
				country,
			},
			order: {
				name: "ASC",
			},
		});

		return transformResponseArray(RegionResponseDto, regionsFound);
	}

	/**
	 * Obtiene todas las provincias asociadas al país configurado en la variable de entorno.
	 *
	 * Descripción detallada:
	 * - Lee el nombre del país desde la variable de entorno `SCHOOL_COUNTRY`.
	 * - Busca la entidad país correspondiente al nombre obtenido.
	 * - Si no encuentra el país, retorna un arreglo vacío.
	 * - Consulta las provincias asociadas a ese país, ordenadas alfabéticamente por nombre.
	 * - Transforma y retorna las provincias como un array de ProvinceResponseDto.
	 *
	 * @returns {Promise<ProvinceResponseDto[]>} Array con las provincias transformadas o vacío si no se encuentra el país.
	 *
	 * @async
	 */
	public async findAllProvinces(): Promise<ProvinceResponseDto[]> {
		const countryName = process.env.SCHOOL_COUNTRY;

		const country = await this.findCountryEntityByName(countryName);

		if (!country) {
			return [];
		}

		const provincesFound = await this.provinceRepository.find({
			where: {
				country,
			},
			order: {
				name: "ASC",
			},
		});

		return transformResponseArray(ProvinceResponseDto, provincesFound);
	}

	/**
	 * Obtiene las provincias asociadas a una región específica.
	 *
	 * Descripción detallada:
	 * - Consulta las provincias filtrando por el ID de la región proporcionada.
	 * - Ordena los resultados alfabéticamente por nombre.
	 * - Transforma y retorna las provincias como un array de ProvinceResponseDto.
	 *
	 * @param {string} regionId - ID de la región para filtrar las provincias.
	 *
	 * @returns {Promise<ProvinceResponseDto[]>} Array con las provincias transformadas.
	 *
	 * @async
	 */
	public async findProvincesByRegionId(
		regionId: string,
	): Promise<ProvinceResponseDto[]> {
		const provincesFound = await this.provinceRepository.find({
			where: {
				regionId,
			},
			order: {
				name: "ASC",
			},
		});

		return transformResponseArray(ProvinceResponseDto, provincesFound);
	}

	/**
	 * Obtiene los distritos asociados a una provincia específica.
	 *
	 * Descripción detallada:
	 * - Consulta los distritos filtrando por el ID de la provincia proporcionada.
	 * - Ordena los resultados alfabéticamente por nombre.
	 * - Transforma y retorna los distritos como un array de DistrictResponseDto.
	 *
	 * @param {string} provinceId - ID de la provincia para filtrar los distritos.
	 *
	 * @returns {Promise<DistrictResponseDto[]>} Array con los distritos transformados.
	 *
	 * @async
	 */
	public async findDistrictsByProvinceId(
		provinceId: string,
	): Promise<DistrictResponseDto[]> {
		const districtsFound = await this.districtRepository.find({
			where: {
				provinceId,
			},
			order: {
				name: "ASC",
			},
		});

		return transformResponseArray(DistrictResponseDto, districtsFound);
	}

	/**
	 * Busca una entidad distrito por su ID.
	 *
	 * Descripción detallada:
	 * - Consulta la base de datos para encontrar un distrito con el ID proporcionado.
	 * - Retorna la entidad District o `undefined` si no existe.
	 *
	 * @param {string} districtId - ID del distrito a buscar.
	 *
	 * @returns {Promise<District | undefined>} Entidad District encontrada o undefined.
	 *
	 * @async
	 */
	public async findDistrictEntityById(districtId): Promise<District> {
		return this.districtRepository.findOne({
			where: {
				id: districtId,
			},
		});
	}

	/**
	 * Busca una entidad país por su nombre.
	 *
	 * Descripción detallada:
	 * - Realiza una consulta para encontrar un país cuyo nombre coincida exactamente.
	 * - Retorna la entidad Country si se encuentra, o `undefined` si no existe.
	 *
	 * @param {string} countryName - Nombre del país a buscar.
	 *
	 * @returns {Promise<Country | undefined>} Entidad Country encontrada o undefined.
	 *
	 * @async
	 */
	private async findCountryEntityByName(countryName: string): Promise<Country> {
		const countryFound = await this.countryRepository.findOne({
			where: {
				name: countryName,
			},
		});

		return countryFound;
	}
}
