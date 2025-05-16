import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SuccessMessage } from "src/common/decorators/success-messages.decorator";
import { DeleteResult, UpdateResult } from "typeorm";
import { AuthGuard } from "../auth/auth.guard";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(AuthGuard)
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
	@SuccessMessage("users.created")
	create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.create(createUserDto);
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
	@SuccessMessage("common.success")
	findAll(): Promise<User[]> {
		return this.userService.findAll();
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
	@SuccessMessage("common.success")
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
	@SuccessMessage("users.updated")
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
	@SuccessMessage("users.deleted")
	remove(@Param("id", ParseUUIDPipe) id: string): Promise<DeleteResult> {
		return this.userService.remove(id);
	}
}
