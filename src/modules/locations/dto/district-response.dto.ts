import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ProvinceResponseDto } from "./province-response.dto";

export class DistrictResponseDto {
	@ApiProperty({
		description: "ID único de la comuna.",
		example: "812B468B-01C7-42C7-84C4-96A339BC3A1C",
	})
	@Expose()
	public id: string;

	@ApiProperty({
		description: "Nombre de la comuna.",
		example: "Santiago",
	})
	@Expose()
	public name: string;

	@ApiProperty({
		description: "Provincia a la que pertenece la comuna.",
		example: {
			id: "90C73D90-02D7-4E85-A3F0-4DB78BC42DFC",
			name: "Santiago",
			region: {
				id: "8040D5D2-2985-45FF-AC4F-764AE4A50648",
				name: "Metropolitana de Santiago",
			},
		},
		required: false,
	})
	@Type(() => ProvinceResponseDto)
	@Expose()
	public province?: ProvinceResponseDto;
}
