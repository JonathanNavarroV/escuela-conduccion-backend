import { Controller, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { MessageKeys } from "src/common/constants/message-keys.constant";
import { SuccessMessageKey } from "src/common/decorators/success-message.decorator";
import { DistrictResponseDto } from "./dto/district-response.dto";
import { LocationLevelResponseDto } from "./dto/location-level-response.dto";
import { ProvinceResponseDto } from "./dto/province-response.dto";
import { RegionResponseDto } from "./dto/region-response.dto";
import { LocationsService } from "./locations.service";

@Controller("locations")
export class LocationsController {
	public constructor(private readonly locationService: LocationsService) {}

	@Get("location_levels")
	@ApiOperation({
		summary: "Obtener los niveles de localización del país de la escuela.",
		description:
			"Retorna una lista con todos los niveles de localización del país de la escuela.",
	})
	@ApiResponse({
		status: 200,
		description: "Listado de niveles de localización obtenido correctamente.",
		type: LocationLevelResponseDto,
		isArray: true,
	})
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findLocationLevels(): Promise<LocationLevelResponseDto[]> {
		return this.locationService.findLocationLevels();
	}

	@Get("regions")
	@ApiOperation({
		summary: "Obtener todas las regiones del país de la escuela.",
		description:
			"Retorna una lista con todas las regiones del país de la escuela",
	})
	@ApiResponse({
		status: 200,
		description: "Listado de regions obtenido correctamente.",
		type: RegionResponseDto,
		isArray: true,
	})
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findAllRegions(): Promise<RegionResponseDto[]> {
		return this.locationService.findAllRegions();
	}

	@Get("provinces")
	@ApiOperation({
		summary: "Obtener todas las provincias del país de la escuela.",
		description:
			"Retorna una lista con todas las provincias del país de la escuela",
	})
	@ApiResponse({
		status: 200,
		description: "Listado de provincias obtenido correctamente.",
		type: ProvinceResponseDto,
		isArray: true,
	})
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findAllProvinces(): Promise<ProvinceResponseDto[]> {
		return this.locationService.findAllProvinces();
	}

	@Get("regions/:regionId/provinces")
	@ApiOperation({
		summary: "Obtener provincias por región",
		description:
			"Retorna una lista con todas las provincias asociadas a una región específica.",
	})
	@ApiParam({
		name: "regionId",
		description: "ID de la región (UUID)",
		example: "3CAECADA-773C-4094-A744-F2AB7C9A5493",
	})
	@ApiResponse({
		status: 200,
		description: "Listado de provincias obtenido correctamente.",
		type: ProvinceResponseDto,
		isArray: true,
	})
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findProvincesByRegionId(
		@Param("regionId", ParseUUIDPipe) regionId: string,
	): Promise<ProvinceResponseDto[]> {
		return this.locationService.findProvincesByRegionId(regionId);
	}

	@Get("provinces/:provinceId/districts")
	@ApiOperation({
		summary: "Obtener comunas por provincia",
		description:
			"Retorna una lista con todas las comunas asociadas a una provincia específica.",
	})
	@ApiParam({
		name: "provinceId",
		description: "ID de la provincia (UUID)",
		example: "3356CED6-D7DD-4DDB-8FC4-9654571FF007",
	})
	@ApiResponse({
		status: 200,
		description: "Listado de comunas obtenido correctamente.",
		type: DistrictResponseDto,
		isArray: true,
	})
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findDistrictsByProvinceId(
		@Param("provinceId", ParseUUIDPipe) provinceId: string,
	): Promise<DistrictResponseDto[]> {
		return this.locationService.findDistrictsByProvinceId(provinceId);
	}
}
