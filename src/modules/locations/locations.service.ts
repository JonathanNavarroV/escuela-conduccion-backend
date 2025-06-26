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
	 * Obtiene los niveles de localización asociados al país definido por `SCHOOL_COUNTRY`.
	 *
	 * Descripción detallada:
	 * - Busca el país configurado en la variable de entorno `SCHOOL_COUNTRY`.
	 * - Si el país no existe, lanza un error 404.
	 * - Si se encuentra, retorna los niveles de localización asociados.
	 *
	 * @returns {Promise<LocationLevelResponseDto[]>} Arreglo de niveles de localización como DTOs.
	 *
	 * @throws {NotFoundException} Si no se encuentra el país.
	 *
	 * @example
	 * const levels = await service.findLocationLevels();
	 * console.log(levels);
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
	 * Obtiene todas las regiones del país definido por `SCHOOL_COUNTRY`.
	 *
	 * Descripción detallada:
	 * - Si no se encuentra el país, retorna un arreglo vacío.
	 *
	 * @returns {Promise<RegionResponseDto[]>} Arreglo de regiones como DTOs.
	 *
	 * @example
	 * const regions = await service.findAllRegions();
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
	 * Obtiene todas las provincias del país definido por `SCHOOL_COUNTRY`.
	 *
	 * Descripción detallada:
	 * - Si no se encuentra el país, retorna un arreglo vacío.
	 *
	 * @returns {Promise<ProvinceResponseDto[]>} Arreglo de provincias como DTOs.
	 *
	 * @example
	 * const provinces = await service.findAllProvinces();
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
	 * Obtiene todas las provincias pertenecientes a una región.
	 *
	 * Descripción detallada:
	 * - Realiza la búsqueda filtrando por `regionId`.
	 *
	 * @param {string} regionId - ID de la región.
	 * @returns {Promise<ProvinceResponseDto[]>} Arreglo de provincias como DTOs.
	 *
	 * @example
	 * const provinces = await service.findProvincesByRegionId('uuid-region');
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
	 * Obtiene todas las comunas pertenecientes a una provincia.
	 *
	 * Descripción detallada:
	 * - Realiza la búsqueda filtrando por `provinceId`.
	 *
	 * @param {string} provinceId - ID de la provincia.
	 * @returns {Promise<DistrictResponseDto[]>} Arreglo de comunas como DTOs.
	 *
	 * @example
	 * const districts = await service.findDistrictsByProvinceId('uuid-province');
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
	 * Busca una comuna por su ID.
	 *
	 * Descripción detallada:
	 * - Devuelve el objeto District si se encuentra o `null` en caso contrario.
	 *
	 * @param {string} districtId - ID de la comuna (UUID).
	 * @returns {Promise<District | null>} Objeto de la entidad o null.
	 *
	 * @example
	 * const district = await service.findDistrictEntityById('uuid');
	 * console.log(district?.name);
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
	 * Busca un país por su nombre exacto.
	 *
	 * Descripción detallada:
	 * - Si no se encuentra un país con ese nombre, retorna null.
	 *
	 * @param {string} countryName - Nombre del país.
	 * @returns {Promise<Country | null>} Entidad `Country` o null.
	 *
	 * @example
	 * const country = await service.findCountryEntityByName("Chile");
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
