import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "./entities/city.entity";
import { Country } from "./entities/country.entity";
import { District } from "./entities/district.entity";
import { LocationsController } from "./locations.controller";
import { LocationsService } from "./locations.service";

@Module({
	imports: [TypeOrmModule.forFeature([Country, City, District])],
	controllers: [LocationsController],
	providers: [LocationsService],
})
export class LocationsModule {}
