import { Exclude } from "class-transformer";
import { Branch } from "src/modules/branches/entities/branch.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export enum UserRole {
	SUPER_ADMIN = "super_admin",
	BRANCH_ADMIN = "branch_admin",
}

@Entity("users")
export class User {
	@PrimaryColumn("uuid")
	public id: string = uuidv4();

	@Column({ type: "varchar", length: 100 })
	public firstName: string;

	@Column({ type: "varchar", length: 50 })
	public lastNameFather: string;

	@Column({ type: "varchar", length: 50 })
	public lastNameMother: string;

	@Column({ type: "varchar", length: 255, unique: true })
	public email: string;

	@Column({ type: "varchar", length: 100 })
	@Exclude()
	public password: string;

	@Column({ type: "varchar", length: 255, nullable: true })
	public photo: string;

	@Column({ type: "varchar", length: 30, default: UserRole.BRANCH_ADMIN })
	public role: UserRole;

	@Column({ type: "bit", default: true })
	public isActive: boolean;

	@ManyToMany(() => Branch, (branch) => branch.user, { eager: true })
	@JoinTable()
	public branches: Branch[];
}
