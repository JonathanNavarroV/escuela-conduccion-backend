import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Country } from "./country.entity";

export enum LocationKey {
	REGION = "region",
	PRIVINCE = "province",
	DISTRICT = "district",
}

@Entity("location-levels")
export class LocationLevel {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column({ type: "varchar", length: 30 })
	public key: LocationKey;

	@Column({ type: "varchar", length: 50 })
	public label_key: string;

	@ManyToOne(() => Country, (country) => country.locationLevel, {
		nullable: false,
	})
	@JoinColumn({ name: "countryId" })
	public country: Country;

	@Column({ type: "uniqueidentifier" })
	public countryId: string;
}
