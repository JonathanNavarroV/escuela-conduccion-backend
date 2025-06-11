import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SuccessMessageKey } from "src/common/decorators/success-message.decorator";
import { DeleteResult, UpdateResult } from "typeorm";
import { BranchesService } from "./branches.service";
import { CreateBranchDto, UpdateBranchDto } from "./dto/branch.dto";
import { Branch } from "./entities/branch.entity";

@Controller("branches")
@ApiBearerAuth()
export class BranchesController {
	public constructor(private readonly branchService: BranchesService) {}

	@Post()
	@ApiOperation({
		summary: "Crear sede",
		description:
			"Crea una nueva sede en el sistema. Verifica que el nombre no exista previamente.",
	})
	@ApiResponse({
		status: 201,
		description: "Sede creada correctamente.",
		type: Branch,
	})
	@ApiResponse({
		status: 409,
		description: "Ya existe una sede con ese nombre.",
	})
	@SuccessMessageKey("branch.created")
	public create(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
		return this.branchService.create(createBranchDto);
	}

	@Get()
	@ApiOperation({
		summary: "Obtener todas las sedes",
		description:
			"Retorna una lista con todas las sedes registradas en el sistema.",
	})
	@ApiResponse({
		status: 200,
		description: "Listado de sedes obtenido correctamente.",
		type: Branch,
		isArray: true,
	})
	@SuccessMessageKey("common.success")
	public findAll(): Promise<Branch[]> {
		return this.branchService.findAll();
	}

	@Get(":id")
	@ApiOperation({
		summary: "Obtener sede por ID",
		description: "Buscar y retorna una sede según su ID (UUID).",
	})
	@ApiResponse({
		status: 200,
		description: "Sede encontrada.",
		type: Branch,
	})
	@ApiResponse({
		status: 404,
		description: "No se encontró una sede con el ID proporcionado.",
	})
	@SuccessMessageKey("common.success")
	public findOneById(@Param("id", ParseUUIDPipe) id: string): Promise<Branch> {
		return this.branchService.findOneById(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Actualizar sede",
		description:
			"Actualiza la información de una sede por su ID. Verifica que el nombre no esté en uso.",
	})
	@ApiResponse({
		status: 200,
		description: "Sede actualizada correctamente.",
	})
	@ApiResponse({
		status: 404,
		description: "Sede no encontrada.",
	})
	@ApiResponse({
		status: 409,
		description: "Ya existe una sede con ese nombre.",
	})
	@SuccessMessageKey("branch.updated")
	public update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateBranchDto: UpdateBranchDto,
	): Promise<UpdateResult> {
		return this.branchService.update(id, updateBranchDto);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Eliminar sede",
		description: "Elimina una sede del sistema por su ID.",
	})
	@ApiResponse({
		status: 200,
		description: "Sede eliminada correctamente.",
	})
	@ApiResponse({
		status: 404,
		description: "Sede no encontrada.",
	})
	@SuccessMessageKey("branch.deleted")
	public remove(@Param("id", ParseUUIDPipe) id: string): Promise<DeleteResult> {
		return this.branchService.remove(id);
	}
}
