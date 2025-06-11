import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateBranchDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Nombre de la sede",
		example: "Maipú",
	})
	public name: string;

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({
		description: "Correo electrónico de la sede",
		example: "maipu@ejemplo.com",
	})
	public email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Número telefónico fijo de la sede",
		example: "+56 2 1234 5678",
	})
	public phone: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Número de teléfono móvil de contacto",
		example: "+56 9 8765 4321",
	})
	public mobile: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Dirección física de la sede",
		example: "Av. Pajaritos 1234",
	})
	public address: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Comuna donde se ubica la sede",
		example: "Maipú",
	})
	public commune: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Ciudad donde se ubica la sede",
		example: "Santiago",
	})
	public city: string;
}

export class UpdateBranchDto extends PartialType(CreateBranchDto) {}
