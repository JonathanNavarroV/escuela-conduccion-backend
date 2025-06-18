import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { City } from "./city.entity";

@Entity("districts")
export class District {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column()
	public name: string;

	@ManyToOne(() => City, (city) => city.districts, { onDelete: "CASCADE" })
	public city: City;
}
