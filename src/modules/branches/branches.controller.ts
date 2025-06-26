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
import { MessageKeys } from "src/common/constants/message-keys.constant";
import { SuccessMessageKey } from "src/common/decorators/success-message.decorator";
import { BranchesService } from "./branches.service";
import { BranchResponseDto } from "./dto/branch-response.dto";
import { CreateBranchDto, UpdateBranchDto } from "./dto/branch.dto";

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
		type: BranchResponseDto,
	})
	@ApiResponse({
		status: 409,
		description: "Ya existe una sede con ese nombre.",
	})
	@SuccessMessageKey(MessageKeys.BRANCH.CREATED)
	public create(
		@Body() createBranchDto: CreateBranchDto,
	): Promise<BranchResponseDto> {
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
		type: BranchResponseDto,
		isArray: true,
	})
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findAll(): Promise<BranchResponseDto[]> {
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
		type: BranchResponseDto,
	})
	@ApiResponse({
		status: 402,
		description: "No se encontraron sedes que coincidan con la búsqueda.",
	})
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public searchByName(
		@Query("searchTerm") searchTerm: string,
	): Promise<BranchResponseDto[]> {
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
		type: BranchResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "No se encontró una sede con el ID proporcionado.",
	})
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findOneById(
		@Param("id", ParseUUIDPipe) id: string,
	): Promise<BranchResponseDto> {
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
		type: BranchResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Sede no encontrada.",
	})
	@ApiResponse({
		status: 409,
		description: "Ya existe una sede con ese nombre.",
	})
	@SuccessMessageKey(MessageKeys.BRANCH.UPDATED)
	public update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateBranchDto: UpdateBranchDto,
	): Promise<BranchResponseDto> {
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
		type: BranchResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Sede no encontrada.",
	})
	@SuccessMessageKey(MessageKeys.BRANCH.ACTIVATED)
	public activate(
		@Param("id", ParseUUIDPipe) id: string,
	): Promise<BranchResponseDto> {
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
		type: BranchResponseDto,
	})
	@ApiResponse({
		status: 404,
		description: "Sede no encontrada.",
	})
	@SuccessMessageKey(MessageKeys.BRANCH.DEACTIVATED)
	public deactivate(
		@Param("id", ParseUUIDPipe) id: string,
	): Promise<BranchResponseDto> {
		return this.branchService.update(id, { isActive: false });
	}
}
