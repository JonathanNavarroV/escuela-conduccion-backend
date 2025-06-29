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
		example: {
			id: "D38DAC55-4FCB-4D33-84E0-20A43D70DC6E",
			name: "Santiago",
			province: {
				id: "90C73D90-02D7-4E85-A3F0-4DB78BC42DFC",
				name: "Santiago",
				region: {
					id: "8040D5D2-2985-45FF-AC4F-764AE4A50648",
					name: "Metropolitana de Santiago",
				},
			},
		},
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
