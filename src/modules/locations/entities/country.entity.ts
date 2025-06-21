import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { LocationLevel } from "./location-level.entity";
import { Province } from "./province.entity";
import { Region } from "./region.entity";

@Entity("countries")
export class Country {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column({ type: "varchar", length: 50, unique: true })
	public name: string;

	@OneToMany(() => LocationLevel, (locationLevel) => locationLevel.country)
	public locationLevel: LocationLevel[];

	@OneToMany(() => Region, (region) => region.country)
	public regions: Region[];

	@OneToMany(() => Province, (province) => province.country)
	public provinces: Province[];
}
