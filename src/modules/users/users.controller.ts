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
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User, UserRole } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
// @UseGuards(AuthGuard)
@ApiBearerAuth()
export class UsersController {
	public constructor(private readonly userService: UsersService) {}

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
	@SuccessMessageKey(MessageKeys.USER.CREATED)
	public create(@Body() createUserDto: CreateUserDto): Promise<User> {
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
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findAllRoles(): Array<any> {
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
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findAll(): Promise<User[]> {
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
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public searchByFullName(
		@Query("searchTerm") searchTerm: string,
	): Promise<User[]> {
		return this.userService.searchByFullName(searchTerm);
	}

	@Get(":id")
	@ApiOperation({
		summary: "Obtener usuario por ID",
		description: "Buscar y retorna un usuario según su ID (UUID).",
	})
	@ApiParam({
		name: "id",
		description: "ID del usuario (UUID)",
		example: "7FC8EBDE-9C9A-4966-8D91-573F53CB68BC",
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
	@SuccessMessageKey(MessageKeys.COMMON.SUCCESS)
	public findOneById(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
		return this.userService.findOneById(id);
	}

	@Patch(":id")
	@ApiOperation({
		summary: "Actualizar usuario",
		description:
			"Actualiza la información de un usuario por su ID. Verifica que el email no esté en uso.",
	})
	@ApiParam({
		name: "id",
		description: "ID del usuario (UUID)",
		example: "7FC8EBDE-9C9A-4966-8D91-573F53CB68BC",
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
	@SuccessMessageKey(MessageKeys.USER.UPDATED)
	public update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<User> {
		return this.userService.update(id, updateUserDto);
	}

	@Patch(":id/activate")
	@ApiOperation({
		summary: "Activar usuario.",
		description:
			"Activa un usuario estableciendo su propiedad isActive en true.",
	})
	@ApiParam({
		name: "id",
		description: "ID del usuario (UUID)",
		example: "7FC8EBDE-9C9A-4966-8D91-573F53CB68BC",
	})
	@ApiResponse({
		status: 200,
		description: "Usuario activado correctamente.",
	})
	@ApiResponse({
		status: 404,
		description: "Usuario no encontrado.",
	})
	@SuccessMessageKey(MessageKeys.USER.ACTIVATED)
	public activate(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
		return this.userService.update(id, { isActive: true });
	}

	@Patch(":id/deactivate")
	@ApiOperation({
		summary: "Desactivar usuario.",
		description:
			"Desactiva un usuario estableciendo su propiedad isActive en false.",
	})
	@ApiParam({
		name: "id",
		description: "ID del usuario (UUID)",
		example: "7FC8EBDE-9C9A-4966-8D91-573F53CB68BC",
	})
	@ApiResponse({
		status: 200,
		description: "Usuario desactivado correctamente.",
	})
	@ApiResponse({
		status: 404,
		description: "Usuario no encontrado.",
	})
	@SuccessMessageKey(MessageKeys.USER.DEACTIVATED)
	public deactivate(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
		return this.userService.update(id, { isActive: false });
	}
}
