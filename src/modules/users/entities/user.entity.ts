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
	public id: string = uuidv4();

	@Column()
	public firstName: string;

	@Column()
	public lastNameFather: string;

	@Column()
	public lastNameMother: string;

	@Column({ unique: true })
	public email: string;

	@Column()
	@Exclude()
	public password: string;

	@Column({ nullable: true })
	public photo: string;

	@Column({
		type: "varchar",
		length: 30,
		default: UserRole.BRANCH_ADMIN,
	})
	public role: UserRole;

	@Column({ default: true })
	public isActive: boolean;

	@ManyToMany(() => Branch, (branch) => branch.user, { eager: true })
	@JoinTable()
	public branches: Branch[];
}
