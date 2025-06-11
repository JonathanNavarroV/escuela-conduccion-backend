import {
	ApiProperty,
	ApiPropertyOptional,
	OmitType,
	PartialType,
} from "@nestjs/swagger";
import {
	IsArray,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl,
	IsUUID,
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
	public firstName: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Apellido paterno del usuario",
		example: "Pérez",
	})
	public lastNameFather: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Apellido materno del usuario",
		example: "González",
	})
	public lastNameMother: string;

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({
		description: "Correo electrónico del usuario",
		example: "juan.perez@ejemplo.com",
	})
	public email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@ApiProperty({
		description: "Contraseña del usuario (Mínimo 6 caracteres)",
		example: "contraseña.segura.123",
	})
	public password: string;

	@IsUrl()
	@IsOptional()
	@ApiPropertyOptional({
		description: "URL de la foto de perfil",
		example: "https://ejemplo.com/juan.jpg",
	})
	public photo?: string;

	@IsEnum(UserRole)
	@ApiPropertyOptional({
		enum: UserRole,
		description: "Rol del usuario",
		example: UserRole.BRANCH_ADMIN,
	})
	public role: UserRole;

	@IsArray()
	@IsOptional()
	@IsUUID(4, { each: true })
	@ApiProperty({
		description: "IDs de las sedes asociadas al usuario",
		example: ["ad3cc723-f6fe-4df6-9854-9439f3a85461"],
	})
	public branchIds: string[];
}

// PartialType permite que las propiedades sean opcionales
export class UpdateUserDto extends PartialType(
	OmitType(CreateUserDto, ["role" as const]),
) {}
