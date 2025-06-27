import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { DistrictResponseDto } from "src/modules/locations/dto/district-response.dto";

export class BranchResponseDto {
	@ApiProperty({
		description: "ID único de la sede.",
		example: "498E4141-8E06-4A31-864A-D6CCFC989E27",
	})
	@Expose()
	public id: string;

	@ApiProperty({
		description: "Nombre de la sede.",
		example: "Maipú",
	})
	@Expose()
	public name: string;

	@ApiProperty({
		description: "Correo electrónico de la sede.",
		example: "maipu@ejemplo.com",
	})
	@Expose()
	public email: string;

	@ApiProperty({
		description: "Número telefónico fijo de la sede.",
		example: "+56 2 1234 5678",
	})
	@Expose()
	public phone: string | null;

	@ApiProperty({
		description: "Número de teléfono móvil de contacto.",
		example: "+56 9 8765 4321",
	})
	@Expose()
	public mobile: string;

	@ApiProperty({
		description: "Dirección física de la sede.",
		example: "Av. Pajaritos 1234",
	})
	@Expose()
	public address: string;

	@ApiProperty({
		description: "Comuna donde se ubica la sede.",
	})
	@Type(() => DistrictResponseDto)
	@Expose()
	public district: DistrictResponseDto;

	@ApiProperty({
		description: "Indica si la sede está activa o no.",
		example: true,
	})
	@Expose()
	public isActive: boolean;
}
