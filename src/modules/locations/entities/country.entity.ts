import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { City } from "./city.entity";

@Entity("countries")
export class Country {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column({ unique: true })
	public name: string;

	@OneToMany(() => City, (city) => city.country)
	public cities: City[];
}
