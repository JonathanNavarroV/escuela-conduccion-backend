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

		await queryRunner.query(
			`ALTER TABLE "branches" ALTER COLUMN "name" varchar(100) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ADD CONSTRAINT "UQ_8387ed27b3d4ca53ec3fc7b029c" UNIQUE ("name")`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ALTER COLUMN "email" varchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ALTER COLUMN "phone" varchar(30)`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ALTER COLUMN "mobile" varchar(30) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ALTER COLUMN "address" varchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "firstName" varchar(100) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "lastNameFather" varchar(50) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "lastNameMother" varchar(50) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "email" varchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "password" varchar(100) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "photo" varchar(255)`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ADD CONSTRAINT "FK_c9b5345300cae52d94cdc53533f" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "branches" DROP CONSTRAINT "FK_c9b5345300cae52d94cdc53533f"`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "photo" nvarchar(255)`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "password" nvarchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "email" nvarchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "lastNameMother" nvarchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "lastNameFather" nvarchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "firstName" nvarchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ALTER COLUMN "address" nvarchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ALTER COLUMN "mobile" nvarchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ALTER COLUMN "phone" nvarchar(255)`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ALTER COLUMN "email" nvarchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" DROP CONSTRAINT "UQ_8387ed27b3d4ca53ec3fc7b029c"`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ALTER COLUMN "name" nvarchar(255) NOT NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ADD CONSTRAINT "UQ_8387ed27b3d4ca53ec3fc7b029c" UNIQUE ("name")`,
		);

		await queryRunner.query(`ALTER TABLE "branches" DROP COLUMN "districtId"`);

		await queryRunner.query(
			`ALTER TABLE "branches" ADD "city" nvarchar(255) NULL`,
		);

		await queryRunner.query(
			`ALTER TABLE "branches" ADD "district" nvarchar(255) NULL`,
		);
	}
}
