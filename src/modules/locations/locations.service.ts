import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { MessageKeys } from "src/common/constants/message-keys.constant";
import { Repository } from "typeorm";
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
	 * Retorna todos los niveles de localización asociadas al país configurado en la variable de entorno `SCHOOL_COUNTRY`.
	 *
	 * - Busca el país por su nombre (`SCHOOL_COUNTRY`).
	 * - Si no se encuentra el país, lanza una excepción 404.
	 * - Si el país existe, retorna todas los niveles de localización relacionadas con él.
	 *
	 * @returns Una promesa que resuelve con un arreglo de objetos `LocationLevel` asociados al país.
	 *
	 * @throws {NotFoundException} Si no se encuentra el país.
	 */
	public async findLocationLevels(): Promise<LocationLevel[]> {
		const countryName = process.env.SCHOOL_COUNTRY;

		const country = await this.findCountryByName(countryName);

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

		return plainToInstance(LocationLevel, locationLevelFound);
	}

	/**
	 * Retorna todas las regiones asociadas al país configurado en la variable de entorno `SCHOOL_COUNTRY`.
	 *
	 * - Busca el país por su nombre (`SCHOOL_COUNTRY`).
	 * - Si no se encuentra el país, lanza una excepción 404.
	 * - Si el país existe, retorna todas las regiones relacionadas con él.
	 *
	 * @returns Una promesa que resuelve con un arreglo de objetos `Region` asociados al país.
	 *
	 * @throws {NotFoundException} Si no se encuentra el país.
	 */
	public async findAllRegions(): Promise<Region[]> {
		const countryName = process.env.SCHOOL_COUNTRY;

		const country = await this.findCountryByName(countryName);

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

		return regionsFound;
	}

	/**
	 * Retorna todas las las provincias asociadas al país configurado en la variable de entorno `SCHOOL_COUNTRY`.
	 *
	 * - Busca el país por su nombre (`SCHOOL_COUNTRY`).
	 * - Si no se encuentra el país, retorna un arreglo vacío.
	 * - Si el país existe, retorna todas las regiones relacionadas con él.
	 *
	 * @returns Una promesa que resuelve con un arreglo de objetos `Province` asociados al país, o un arreglo vacío si el país no existe.
	 */
	public async findAllProvinces(): Promise<Province[]> {
		const countryName = process.env.SCHOOL_COUNTRY;

		const country = await this.findCountryByName(countryName);

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

		return provincesFound;
	}

	/**
	 * Retorna todos las provincias asociadas a una región específica.
	 *
	 * @param regionId - ID de la región (UUID) para la que se desean obtener las provincias.
	 * @returns Una promesa que resuelve con un arreglo de objetos `Province` pertenecientes a la región.
	 */
	public async findProvincesByRegionId(regionId: string): Promise<Province[]> {
		const provincesFound = await this.provinceRepository.find({
			where: {
				regionId,
			},
			order: {
				name: "ASC",
			},
		});

		return provincesFound;
	}

	/**
	 * Retorna todos las comunas asociadas a una provincia específica.
	 *
	 * @param provinceId - ID de la provincia (UUID) para la que se desean obtener las comunas.
	 * @returns Una promesa que resuelve con un arreglo de objetos `District` pertenecientes a la región.
	 */
	public async findDistrictsByProvinceId(
		provinceId: string,
	): Promise<District[]> {
		const districtsFound = await this.districtRepository.find({
			where: {
				provinceId,
			},
			order: {
				name: "ASC",
			},
		});

		return districtsFound;
	}

	/**
	 * Busca un país por su nombre.
	 *
	 * - Realiza una búsqueda exacta por el nombre del país.
	 * - El nombre es recibido como argumento (`countryName`).
	 * - Si no se encuentra, retorna `null`.
	 *
	 * @param countryName - Nombre del país a buscar.
	 * @returns Una promesa que resuelve con un objeto `Country` si se encuentra, o `null` si no existe.
	 */
	private async findCountryByName(countryName: string): Promise<Country> {
		const countryFound = await this.countryRepository.findOne({
			where: {
				name: countryName,
			},
		});

		return countryFound;
	}
}
