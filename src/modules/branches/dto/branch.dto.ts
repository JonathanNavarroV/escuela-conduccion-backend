import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	Length,
} from "class-validator";

export class CreateBranchDto {
	@IsString()
	@Length(1, 100)
	@ApiProperty({
		description: "Nombre de la sede.",
		example: "Maipú",
		maxLength: 100,
	})
	public name: string;

	@IsEmail()
	@Length(1, 255)
	@ApiProperty({
		description: "Correo electrónico de la sede.",
		example: "maipu@ejemplo.com",
		maxLength: 255,
	})
	public email: string;

	@IsString()
	@IsOptional()
	@Length(1, 30)
	@ApiProperty({
		description: "Número telefónico fijo de la sede.",
		example: "+56 2 1234 5678",
		maxLength: 30,
		required: false,
	})
	public phone: string;

	@IsString()
	@Length(1, 30)
	@ApiProperty({
		description: "Número de teléfono móvil de contacto.",
		example: "+56 9 8765 4321",
		maxLength: 30,
	})
	public mobile: string;

	@IsString()
	@Length(1, 255)
	@ApiProperty({
		description: "Dirección física de la sede.",
		example: "Av. Pajaritos 1234",
		maxLength: 255,
	})
	public address: string;

	@IsUUID(4)
	@IsNotEmpty()
	@ApiProperty({
		description: "ID de la comuna donde se ubica la sede.",
		example: "F420267D-CD89-40E2-896F-5520E09D3F4B",
	})
	public districtId: string;
}

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
	@IsBoolean()
	@IsOptional()
	@ApiProperty({
		description: "Indica si la sede está activa o no.",
		example: true,
		required: false,
	})
	public isActive: boolean;
}
