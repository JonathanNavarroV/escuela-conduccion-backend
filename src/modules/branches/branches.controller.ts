import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiResponse,
} from "@nestjs/swagger";
import { SuccessMessageKey } from "src/common/decorators/success-message.decorator";
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

	@Get("search")
	@ApiOperation({
		summary: "Buscar sedes por coincidencia de nombre",
		description:
			"Devuelve una lista de sedes cuyo nombre coincida parcialmente con el valor proporcionado.",
	})
	@ApiResponse({
		status: 200,
		description: "Sedes encontradas que coinciden con la búsqueda.",
		type: Branch,
	})
	@ApiResponse({
		status: 402,
		description: "No se encontraron sedes que coincidan con la búsqueda.",
	})
	@SuccessMessageKey("common.success")
	public searchByName(
		@Query("searchTerm") searchTerm: string,
	): Promise<Branch[]> {
		return this.branchService.searchByName(searchTerm);
	}

	@Get(":id")
	@ApiOperation({
		summary: "Obtener sede por ID",
		description: "Buscar y retorna una sede según su ID (UUID).",
	})
	@ApiParam({
		name: "id",
		description: "ID de la sede (UUID)",
		example: "44A7E21A-4870-4DAF-8DAD-EF73B8593274",
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
	@ApiParam({
		name: "id",
		description: "ID de la sede (UUID)",
		example: "44A7E21A-4870-4DAF-8DAD-EF73B8593274",
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
	): Promise<Branch> {
		return this.branchService.update(id, updateBranchDto);
	}

	@Patch(":id/activate")
	@ApiOperation({
		summary: "Activar sede.",
		description: "Activa una sede estableciendo su propiedad isActive en true.",
	})
	@ApiParam({
		name: "id",
		description: "ID de la sede (UUID)",
		example: "44A7E21A-4870-4DAF-8DAD-EF73B8593274",
	})
	@ApiResponse({
		status: 200,
		description: "Sede activada correctamente.",
	})
	@ApiResponse({
		status: 404,
		description: "Sede no encontrada.",
	})
	@SuccessMessageKey("branch.activated")
	public activate(@Param("id", ParseUUIDPipe) id: string): Promise<Branch> {
		return this.branchService.update(id, { isActive: true });
	}

	@Patch(":id/deactivate")
	@ApiOperation({
		summary: "Desactivar sede.",
		description:
			"Desactiva una sede estableciendo su propiedad isActive en false.",
	})
	@ApiParam({
		name: "id",
		description: "ID de la sede (UUID)",
		example: "44A7E21A-4870-4DAF-8DAD-EF73B8593274",
	})
	@ApiResponse({
		status: 200,
		description: "Sede desactivada correctamente.",
	})
	@ApiResponse({
		status: 404,
		description: "Sede no encontrada.",
	})
	@SuccessMessageKey("branch.deactivated")
	public deactivate(@Param("id", ParseUUIDPipe) id: string): Promise<Branch> {
		return this.branchService.update(id, { isActive: false });
	}
}
