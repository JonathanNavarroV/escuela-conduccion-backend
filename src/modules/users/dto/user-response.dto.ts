import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { BranchResponseDto } from "src/modules/branches/dto/branch-response.dto";
import { UserRole } from "../entities/user.entity";

export class UserResponseDto {
	@ApiProperty({
		description: "ID único del usuario.",
		example: "812B468B-01C7-42C7-84C4-96A339BC3A1C",
	})
	@Expose()
	public id: string;

	@ApiProperty({
		description: "Nombre del usuario.",
		example: "Juan Carlos",
	})
	@Expose()
	public firstName: string;

	@ApiProperty({
		description: "Apellido paterno del usuario.",
		example: "Pérez",
	})
	@Expose()
	public lastNameFather: string;

	@ApiProperty({
		description: "Apellido materno del usuario.",
		example: "González",
	})
	@Expose()
	public lastNameMother: string;

	@ApiProperty({
		description: "Correo electrónico del usuario.",
		example: "juan.perez@ejemplo.com",
	})
	@Expose()
	public email: string;

	@ApiProperty({
		description: "URL de la foto de perfil.",
		example: "https://ejemplo.com/juan.jpg",
		nullable: true,
		required: false,
	})
	@Expose()
	public photo: string | null;

	@ApiProperty({
		enum: UserRole,
		description: "Rol del usuario.",
		example: UserRole.BRANCH_ADMIN,
	})
	@Expose()
	public role: UserRole;

	@ApiProperty({
		description: "Indica si el usuario está activo o no.",
		example: true,
	})
	@Expose()
	public isActive: boolean;

	@ApiProperty({
		description: "Listado de sedes asociadas al usuario.",
		type: () => [BranchResponseDto],
	})
	@Type(() => BranchResponseDto)
	@Expose()
	public branches: BranchResponseDto[];
}
