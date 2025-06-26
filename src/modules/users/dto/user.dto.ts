import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import {
	IsArray,
	IsBoolean,
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	IsUrl,
	IsUUID,
	Length,
} from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
	@IsString()
	@Length(1, 100)
	@ApiProperty({
		description: "Nombre del usuario.",
		example: "Juan Carlos",
		maxLength: 100,
	})
	public firstName: string;

	@IsString()
	@Length(1, 50)
	@ApiProperty({
		description: "Apellido paterno del usuario.",
		example: "Pérez",
		maxLength: 50,
	})
	public lastNameFather: string;

	@IsString()
	@Length(1, 50)
	@ApiProperty({
		description: "Apellido materno del usuario.",
		example: "González",
		maxLength: 50,
	})
	public lastNameMother: string;

	@IsEmail()
	@Length(1, 255)
	@ApiProperty({
		description: "Correo electrónico del usuario.",
		example: "juan.perez@ejemplo.com",
		maxLength: 255,
	})
	public email: string;

	@IsString()
	@Length(6, 255)
	@ApiProperty({
		description: "Contraseña del usuario (Mínimo 6 caracteres).",
		example: "contraseña.segura.123",
		maxLength: 255,
	})
	public password: string;

	@IsUrl()
	@IsOptional()
	@Length(1, 255)
	@ApiProperty({
		description: "URL de la foto de perfil.",
		example: "https://ejemplo.com/juan.jpg",
		maxLength: 255,
		required: false,
	})
	public photo: string;

	@IsEnum(UserRole)
	@ApiProperty({
		enum: UserRole,
		description: "Rol del usuario",
		example: UserRole.BRANCH_ADMIN,
	})
	public role: UserRole;

	@IsArray()
	@IsUUID(4, { each: true })
	@ApiProperty({
		description: "IDs de las sedes asociadas al usuario.",
		example: ["498E4141-8E06-4A31-864A-D6CCFC989E27"],
	})
	public branchIds: string[];
}

// PartialType permite que las propiedades sean opcionales
export class UpdateUserDto extends PartialType(
	OmitType(CreateUserDto, ["role"] as const),
) {
	@IsBoolean()
	@IsOptional()
	@ApiProperty({
		description: "Indica si el usuario está activo o no.",
		example: true,
		required: false,
	})
	public isActive: boolean;
}
