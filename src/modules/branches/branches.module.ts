import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationsModule } from "../locations/locations.module";
import { BranchesController } from "./branches.controller";
import { BranchesService } from "./branches.service";
import { Branch } from "./entities/branch.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Branch]), LocationsModule],
	controllers: [BranchesController],
	providers: [BranchesService],
	exports: [BranchesService],
})
export class BranchesModule {}
