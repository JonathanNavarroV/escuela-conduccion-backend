import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { RegionResponseDto } from "./region-response.dto";

export class ProvinceResponseDto {
	@ApiProperty({
		description: "ID único de la provincia.",
		example: "812B468B-01C7-42C7-84C4-96A339BC3A1C",
	})
	@Expose()
	public id: string;

	@ApiProperty({
		description: "Nombre de la provincia.",
		example: "Santiago",
	})
	@Expose()
	public name: string;

	@ApiProperty({
		description: "Región a la que pertenece la provincia.",
		example: {
			id: "8040D5D2-2985-45FF-AC4F-764AE4A50648",
			name: "Metropolitana de Santiago",
		},
		nullable: true,
		required: false,
	})
	@Type(() => RegionResponseDto)
	@Expose()
	public region?: RegionResponseDto | null;
}
