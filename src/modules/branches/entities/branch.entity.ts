import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Branch {
	@PrimaryColumn("uuid")
	id: string = uuidv4();

	@Column({ unique: true })
	name: string;

	@Column()
	email: string;

	@Column({ nullable: true })
	phone: string;

	@Column()
	mobile: string;

	@Column()
	address: string;

	@Column()
	commune: string;

	@Column()
	city: string;

	@ManyToMany(() => User, (user) => user.branches)
	user: User[];
}
