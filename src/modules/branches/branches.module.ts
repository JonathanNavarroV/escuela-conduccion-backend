import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { District } from "../locations/entities/district.entity";
import { BranchesController } from "./branches.controller";
import { BranchesService } from "./branches.service";
import { Branch } from "./entities/branch.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Branch, District])],
	controllers: [BranchesController],
	providers: [BranchesService],
	exports: [BranchesService],
})
export class BranchesModule {}
