import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1750137723537 implements MigrationInterface {
	name = "InitialSchema1750137723537";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "branches" ("id" uniqueidentifier NOT NULL, "name" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "phone" nvarchar(255), "mobile" nvarchar(255) NOT NULL, "address" nvarchar(255) NOT NULL, "district" nvarchar(255) NOT NULL, "city" nvarchar(255) NOT NULL, "isActive" bit NOT NULL CONSTRAINT "DF_e3472a0b99c8cf767ea751c80b6" DEFAULT 1, CONSTRAINT "UQ_8387ed27b3d4ca53ec3fc7b029c" UNIQUE ("name"), CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" uniqueidentifier NOT NULL, "firstName" nvarchar(255) NOT NULL, "lastNameFather" nvarchar(255) NOT NULL, "lastNameMother" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "photo" nvarchar(255), "role" varchar(30) NOT NULL CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a" DEFAULT 'branch_admin', "isActive" bit NOT NULL CONSTRAINT "DF_409a0298fdd86a6495e23c25c66" DEFAULT 1, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "countries" ("id" uniqueidentifier NOT NULL, "name" nvarchar(255) NOT NULL, CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "cities" ("id" uniqueidentifier NOT NULL, "name" nvarchar(255) NOT NULL, "countryId" uniqueidentifier, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "districts" ("id" uniqueidentifier NOT NULL, "name" nvarchar(255) NOT NULL, "cityId" uniqueidentifier, CONSTRAINT "PK_972a72ff4e3bea5c7f43a2b98af" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "users_branches_branches" ("usersId" uniqueidentifier NOT NULL, "branchesId" uniqueidentifier NOT NULL, CONSTRAINT "PK_90eabbc0cf695657bb55e6ca9de" PRIMARY KEY ("usersId", "branchesId"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d052511fd44db07fe6fdb77be8" ON "users_branches_branches" ("usersId") `,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d98b36bb08af25a41717062903" ON "users_branches_branches" ("branchesId") `,
		);
		await queryRunner.query(
			`ALTER TABLE "cities" ADD CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "districts" ADD CONSTRAINT "FK_65f489c5687887adeeb14b87df7" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "users_branches_branches" ADD CONSTRAINT "FK_d052511fd44db07fe6fdb77be87" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
		);
		await queryRunner.query(
			`ALTER TABLE "users_branches_branches" ADD CONSTRAINT "FK_d98b36bb08af25a41717062903f" FOREIGN KEY ("branchesId") REFERENCES "branches"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users_branches_branches" DROP CONSTRAINT "FK_d98b36bb08af25a41717062903f"`,
		);
		await queryRunner.query(
			`ALTER TABLE "users_branches_branches" DROP CONSTRAINT "FK_d052511fd44db07fe6fdb77be87"`,
		);
		await queryRunner.query(
			`ALTER TABLE "districts" DROP CONSTRAINT "FK_65f489c5687887adeeb14b87df7"`,
		);
		await queryRunner.query(
			`ALTER TABLE "cities" DROP CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3"`,
		);
		await queryRunner.query(
			`DROP INDEX "IDX_d98b36bb08af25a41717062903" ON "users_branches_branches"`,
		);
		await queryRunner.query(
			`DROP INDEX "IDX_d052511fd44db07fe6fdb77be8" ON "users_branches_branches"`,
		);
		await queryRunner.query(`DROP TABLE "users_branches_branches"`);
		await queryRunner.query(`DROP TABLE "districts"`);
		await queryRunner.query(`DROP TABLE "cities"`);
		await queryRunner.query(`DROP TABLE "countries"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TABLE "branches"`);
	}
}
