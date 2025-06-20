import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MessageKeys } from "src/common/constants/message-keys.constant";
import { SuccessMessageKey } from "src/common/decorators/success-message.decorator";
import { Region } from "./entities/region.entity";
import { LocationsService } from "./locations.service";

@Controller("locations")
export class LocationsController {
	public constructor(private readonly locationService: LocationsService) {}

	@Get("regions")
	@ApiOperation({
		summary: "Obtener todas las regiones del país de la escuela.",
		description:
			"Retorna una lista con todas las regiones del país de la escuela",
	})
	@ApiResponse({
		status: 200,
		description: "Listado de regions obtenido correctamente.",
		type: Region,
		isArray: true,
	})
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findAllCities(): Promise<Region[]> {
		return this.locationService.findAllRegions();
	}

	// @Get("cities/:cityId/districts")
	// @ApiOperation({
	// 	summary: "Obtener distritos por ciudad",
	// 	description:
	// 		"Retorna una lista con todos los distritos asociados a una ciudad específica.",
	// })
	// @ApiParam({
	// 	name: "cityId",
	// 	description: "ID de la ciudad (UUID)",
	// 	example: "75481FC4-FF0B-4437-B598-E0050F377BF9",
	// })
	// @ApiResponse({
	// 	status: 200,
	// 	description: "Listado de distritos obtenido correctamente.",
	// 	type: District,
	// 	isArray: true,
	// })
	// @SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	// public findDistrictsByCityId(
	// 	@Param("cityId", ParseUUIDPipe) cityId: string,
	// ): Promise<District[]> {
	// 	return this.locationService.findDistrictsByCityId(cityId);
	// }
}
