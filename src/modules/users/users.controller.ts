import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SuccessMessageKey } from "src/common/decorators/success-message.decorator";
import { DeleteResult, UpdateResult } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User, UserRole } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
// @UseGuards(AuthGuard)
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Post()
	@ApiOperation({
		summary: "Crear usuario",
		description:
			"Crea un nuevo usuario en el sistema. Verifica que el email no exista previamente.",
	})
	@ApiResponse({
		status: 201,
		description: "Usuario creado correctamente.",
		type: User,
	})
	@ApiResponse({
		status: 409,
		description: "Ya existe un usuario con ese correo electrónico.",
	})
	@SuccessMessageKey("user.created")
	create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.create(createUserDto);
	}

	@Get("roles")
	@ApiOperation({
		summary: "Obtener todos los roles de usuario",
		description:
			"Retorna una lista con todos los roles válidos que puede tener un usuario.",
	})
	@ApiResponse({
		status: 200,
		description: "Listado de roles obtenido correctamente.",
		type: String,
		isArray: true,
	})
	@SuccessMessageKey("common.success")
	findAllRoles(): Array<any> {
		return Object.values(UserRole);
	}

	@Get()
	@ApiOperation({
		summary: "Obtener todos los usuarios",
		description:
			"Retorna una lista con todos los usuarios registrados en el sistema.",
	})
	@ApiResponse({
		status: 200,
		description: "Listado de usuarios obtenido correctamente.",
		type: User,
		isArray: true,
	})
	@SuccessMessageKey("common.success")
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get("search")
	@ApiOperation({
		summary: "Buscar usuarios por coincidencia de nombre",
		description:
			"Devuelve una lista de usuarios cuyo nombre y/o apellido coincida parcialmente con el valor proporcionado.",
	})
	@ApiResponse({
		status: 200,
		description: "Usuarios encontrados que coinciden con la búsqueda.",
		type: [User],
	})
	@ApiResponse({
		status: 404,
		description: "No se encontraron usuarios que coincidan con la búsqueda.",
	})
	@SuccessMessageKey("common.success")
	searchByFullName(@Query("fullName") searchTerm: string): Promise<User[]> {
		return this.userService.searchByFullName(searchTerm);
	}

	@Get(":id")
	@ApiOperation({
		summary: "Obtener usuario por ID",
		description: "Buscar y retorna un usuario según su ID (UUID).",
	})
	@ApiResponse({
		status: 200,
		description: "Usuario encontrado.",
		type: User,
	})
	@ApiResponse({
		status: 404,
		description: "No se encontró un usuario con el ID proporcionado.",
	})
	@SuccessMessageKey("common.success")
	findOneById(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
		return this.userService.findOneById(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Actualizar usuario",
		description:
			"Actualiza la información de un usuario por su ID. Verifica que el email no esté en uso.",
	})
	@ApiResponse({
		status: 200,
		description: "Usuario actualizado correctamente.",
	})
	@ApiResponse({
		status: 404,
		description: "Usuario no encontrado.",
	})
	@ApiResponse({
		status: 409,
		description: "Ya existe un usuario con ese correo electrónico.",
	})
	@SuccessMessageKey("user.updated")
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<UpdateResult> {
		return this.userService.update(id, updateUserDto);
	}

	@Delete(":id")
	@ApiOperation({
		summary: "Eliminar usuario",
		description: "Elimina un usuario del sistema por su ID.",
	})
	@ApiResponse({
		status: 200,
		description: "Usuario eliminado correctamente.",
	})
	@ApiResponse({
		status: 404,
		description: "Usuario no encontrado.",
	})
	@SuccessMessageKey("user.deleted")
	remove(@Param("id", ParseUUIDPipe) id: string): Promise<DeleteResult> {
		return this.userService.remove(id);
	}
}
