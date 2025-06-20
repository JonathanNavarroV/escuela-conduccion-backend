import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Country } from "./country.entity";
import { Province } from "./province.entity";

@Entity("regions")
export class Region {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column()
	public name: string;

	@ManyToOne(() => Country, (country) => country.regions, { nullable: false })
	@JoinColumn({ name: "countryId" })
	public country: Country;

	@Column()
	public countryId: string;

	@OneToMany(() => Province, (province) => province.region)
	public provinces: Province[];
}
