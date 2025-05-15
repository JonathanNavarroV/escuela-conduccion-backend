import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
	SUPER_ADMIN = "super_admin",
	BRANCH_ADMIN = "branch_admin",
}

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	firstName: string;

	@Column()
	lastNameFather: string;

	@Column()
	lastNameMother: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ nullable: true })
	photo: string;

	@Column({
		type: "varchar",
		length: 30,
		default: UserRole.BRANCH_ADMIN,
	})
	role: UserRole;
}
