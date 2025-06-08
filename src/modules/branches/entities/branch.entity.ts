import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branch {
	@PrimaryGeneratedColumn("uuid")
	id: string;

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
}
