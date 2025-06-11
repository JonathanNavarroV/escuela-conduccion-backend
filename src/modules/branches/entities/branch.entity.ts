import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Branch {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column({ unique: true })
	public name: string;

	@Column()
	public email: string;

	@Column({ nullable: true })
	public phone: string;

	@Column()
	public mobile: string;

	@Column()
	public address: string;

	@Column()
	public commune: string;

	@Column()
	public city: string;

	@ManyToMany(() => User, (user) => user.branches)
	public user: User[];
}
