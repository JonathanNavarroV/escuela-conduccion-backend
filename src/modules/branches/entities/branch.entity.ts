import { District } from "src/modules/locations/entities/district.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("branches")
export class Branch {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column({ type: "varchar", length: 100, unique: true })
	public name: string;

	@Column({ type: "varchar", length: 255 })
	public email: string;

	@Column({ type: "varchar", length: 30, nullable: true })
	public phone: string;

	@Column({ type: "varchar", length: 30 })
	public mobile: string;

	@Column({ type: "varchar", length: 255 })
	public address: string;

	@ManyToOne(() => District, (district) => district.branches)
	@JoinColumn({ name: "districtId" })
	public district: District;

	@Column({ type: "uniqueidentifier" })
	public districtId;

	@Column({ type: "bit", default: true })
	public isActive: boolean;

	@ManyToMany(() => User, (user) => user.branches)
	public user: User[];
}
