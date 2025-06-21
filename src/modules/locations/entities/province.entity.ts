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
import { District } from "./district.entity";
import { Region } from "./region.entity";

@Entity("provinces")
export class Province {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column({ type: "varchar", length: 50 })
	public name: string;

	@ManyToOne(() => Country, (country) => country.provinces)
	@JoinColumn({ name: "countryId" })
	public country: Country;

	@Column({ type: "uniqueidentifier" })
	public countryId;

	@ManyToOne(() => Region, (region) => region.provinces, { nullable: true })
	@JoinColumn({ name: "regionId" })
	public region: Region;

	@Column({ type: "uniqueidentifier", nullable: true })
	public regionId: string;

	@OneToMany(() => District, (district) => district.province)
	public districts: District[];
}
