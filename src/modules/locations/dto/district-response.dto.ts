import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

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
}
