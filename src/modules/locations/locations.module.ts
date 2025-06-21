import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Country } from "./entities/country.entity";
import { District } from "./entities/district.entity";
import { LocationLevel } from "./entities/location-level.entity";
import { Province } from "./entities/province.entity";
import { Region } from "./entities/region.entity";
import { LocationsController } from "./locations.controller";
import { LocationsService } from "./locations.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			LocationLevel,
			Country,
			Region,
			Province,
			District,
		]),
	],
	controllers: [LocationsController],
	providers: [LocationsService],
})
export class LocationsModule {}
