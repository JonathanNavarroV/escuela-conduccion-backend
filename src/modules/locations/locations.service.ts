import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Country } from "./entities/country.entity";
import { District } from "./entities/district.entity";
import { Province } from "./entities/province.entity";
import { Region } from "./entities/region.entity";

@Injectable()
export class LocationsService {
	public constructor(
		@InjectRepository(Country) private countryRepository: Repository<Country>,
		@InjectRepository(Region) private regionRepository: Repository<Region>,
		@InjectRepository(Province)
		private provinceRepository: Repository<Province>,
		@InjectRepository(District)
		private districtRepository: Repository<District>,
	) {}

	/**
	 * Retorna todas las regiones asociadas al país configurado en la variable de entorno `SCHOOL_COUNTRY`.
	 *
	 * - Busca el país por su nombre (`SCHOOL_COUNTRY`).
	 * - Si no se encuentra el país, retorna un arreglo vacío.
	 * - Si el país existe, retorna todas las regiones relacionadas con él.
	 *
	 * @returns Una promesa que resuelve con un arreglo de objetos `Region` asociados al país, o un arreglo vacío si el país no existe.
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
		});

		return regionsFound;
	}

	// /**
	//  * Retorna todos los distritos asociados a una ciudad específica.
	//  *
	//  * - Verifica la existencia de la ciudad.
	//  * - Busca todos los distritos relacionados a esa ciudad.
	//  *
	//  * @param cityId - ID de la ciudad (UUID) para la que se desean obtener los distritos.
	//  * @returns Una promesa que resuelve con un arreglo de objetos `District` pertenecientes a la ciudad.
	//  */
	// public async findDistrictsByCityId(cityId: string): Promise<District[]> {
	// 	// const city = await this.findCityById(cityId);

	// 	const districtsFound = await this.districtRepository.find({
	// 		where: {
	// 			city,
	// 		},
	// 	});

	// 	return districtsFound;
	// }

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

	// /**
	//  * Busca una ciudad por su ID.
	//  *
	//  * @param cityId - ID de la ciudad (UUID) a buscar.
	//  * @returns Una promesa que resuelve con la ciudad encontrada, o `null` si no existe.
	//  */
	// private async findCityById(cityId: string): Promise<City> {
	// 	const cityFound = await this.cityRepository.findOne({
	// 		where: {
	// 			id: cityId,
	// 		},
	// 	});

	// 	return cityFound;
	// }
}
