import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { LocationKey } from "../entities/location-level.entity";

export class LocationLevelResponseDto {
	@ApiProperty({
		enum: LocationKey,
		description: "Clave única que identifica el nivel geográfico.",
		example: LocationKey.REGION,
	})
	@Expose()
	public key: LocationKey;

	@ApiProperty({
		description: "Clave de texto traducible asociada al nivel geográfico.",
		example: "location.chile.region",
	})
	@Expose()
	public label_key: string;
}
