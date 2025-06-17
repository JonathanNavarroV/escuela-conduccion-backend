import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Country } from "./country.entity";
import { District } from "./district.entity";

@Entity("cities")
export class City {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column()
	public name: string;

	@ManyToOne(() => Country, (country) => country.cities, {
		onDelete: "CASCADE",
	})
	public country: Country;

	@OneToMany(() => District, (district) => district.city)
	public districts: District[];
}
