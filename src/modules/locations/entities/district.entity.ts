import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Province } from "./province.entity";

@Entity("districts")
export class District {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column({ type: "varchar", length: 50 })
	public name: string;

	@ManyToOne(() => Province, (province) => province.districts, {
		nullable: false,
	})
	@JoinColumn({ name: "provinceId" })
	public province: Province;

	@Column({ type: "uniqueidentifier" })
	public provinceId: string;
}
