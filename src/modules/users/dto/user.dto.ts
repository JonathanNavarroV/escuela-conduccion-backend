import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl,
	MinLength,
} from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Nombre del usuario",
		example: "Juan Carlos",
	})
	firstName: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Apellido paterno del usuario",
		example: "Pérez",
	})
	lastNameFather: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Apellido materno del usuario",
		example: "González",
	})
	lastNameMother: string;

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({
		description: "Correo electrónico del usuario",
		example: "juan.perez@ejemplo.com",
	})
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@ApiProperty({
		description: "Contraseña del usuario (Mínimo 6 caracteres)",
		example: "juan.perez@ejemplo.com",
	})
	password: string;

	@IsUrl()
	@IsOptional()
	@ApiPropertyOptional({
		description: "URL de la foto de perfil",
		example: "https://ejemplo.com/juan.jpg",
	})
	photo?: string;

	@IsEnum(UserRole)
	@IsOptional()
	@ApiPropertyOptional({
		enum: UserRole,
		description: "Rol del usuario",
		example: UserRole.BRANCH_ADMIN,
	})
	role?: UserRole;
}

// PartialType permite que las propiedades sean opcionales
export class UpdateUserDto extends PartialType(CreateUserDto) {}
