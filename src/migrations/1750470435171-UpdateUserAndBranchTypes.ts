import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAndBranchTypes1750470435171
	implements MigrationInterface
{
	name = "UpdateUserAndBranchTypes1750470435171";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "district"`);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "city"`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "districtId" uniqueidentifier NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "branches" DROP CONSTRAINT "UQ_8387ed27b3d4ca53ec3fc7b029c"`,
		);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "name"`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "name" varchar(100) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD CONSTRAINT "UQ_8387ed27b3d4ca53ec3fc7b029c" UNIQUE ("name")`,
		);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "email"`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "email" varchar(255) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "phone"`);
		await queryRunner.query(`ALTER TABLE "branches" ADD "phone" varchar(30)`);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "mobile"`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "mobile" varchar(30) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "address"`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "address" varchar(255) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "firstName" varchar(100) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastNameFather"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "lastNameFather" varchar(50) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastNameMother"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "lastNameMother" varchar(50) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "email" varchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "password" varchar(100) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "photo"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "photo" varchar(255)`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD CONSTRAINT "FK_c9b5345300cae52d94cdc53533f" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "branches" DROP CONSTRAINT "FK_c9b5345300cae52d94cdc53533f"`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "photo"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "photo" nvarchar(255)`);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "password" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "email" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastNameMother"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "lastNameMother" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastNameFather"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "lastNameFather" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "firstName" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "address"`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "address" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "mobile"`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "mobile" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "phone"`);
		await queryRunner.query(`ALTER TABLE "branches" ADD "phone" nvarchar(255)`);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "email"`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "email" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "branches" DROP CONSTRAINT "UQ_8387ed27b3d4ca53ec3fc7b029c"`,
		);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "name"`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "name" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD CONSTRAINT "UQ_8387ed27b3d4ca53ec3fc7b029c" UNIQUE ("name")`,
		);
		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "districtId"`);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "city" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "branches" ADD "district" nvarchar(255) NOT NULL`,
		);
	}
}
