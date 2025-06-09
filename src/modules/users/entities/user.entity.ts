import { Exclude } from "class-transformer";
import { Branch } from "src/modules/branches/entities/branch.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export enum UserRole {
	SUPER_ADMIN = "super_admin",
	BRANCH_ADMIN = "branch_admin",
}

@Entity()
export class User {
	@PrimaryColumn("uuid")
	id: string = uuidv4();

	@Column()
	firstName: string;

	@Column()
	lastNameFather: string;

	@Column()
	lastNameMother: string;

	@Column({ unique: true })
	email: string;

	@Column()
	@Exclude()
	password: string;

	@Column({ nullable: true })
	photo: string;

	@Column({
		type: "varchar",
		length: 30,
		default: UserRole.BRANCH_ADMIN,
	})
	role: UserRole;

	@ManyToMany(() => Branch, (branch) => branch.user, { eager: true })
	@JoinTable()
	branches: Branch[];
}
