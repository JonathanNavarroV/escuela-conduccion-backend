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

	@Column()
	public name: string;

	@ManyToOne(() => Country, (country) => country.provinces, { nullable: false })
	@JoinColumn({ name: "countryId" })
	public country: Country;

	@Column()
	public countryId;

	@ManyToOne(() => Region, (region) => region.provinces, { nullable: true })
	@JoinColumn({ name: "regionId" })
	public region: Region;

	@Column({ nullable: true })
	public regionId: string;

	@OneToMany(() => District, (district) => district.province)
	public districts: District[];
}
