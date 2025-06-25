import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Branch } from "src/modules/branches/entities/branch.entity";
import { UserRole } from "../entities/user.entity";

export class UserResponseDto {
	@ApiProperty({
		description: "ID único del usuario.",
		example: "9f84fa5c-4b6e-4e90-90f5-5cc9cb7a789f",
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
		type: () => [Branch],
	})
	@Expose()
	public branches: Branch[];
}
