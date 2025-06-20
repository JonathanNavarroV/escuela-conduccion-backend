import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLocationLevelAndTypes1750442742744
	implements MigrationInterface
{
	name = "UpdateLocationLevelAndTypes1750442742744";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "location-levels" ("id" uniqueidentifier NOT NULL, "key" varchar(30) NOT NULL, "label_key" varchar(50) NOT NULL, "countryId" uniqueidentifier NOT NULL, CONSTRAINT "PK_0a52cdeb5ae4b2f5a3e5a3be928" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "districts" ALTER COLUMN "name" varchar(50) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "provinces" ALTER COLUMN "name" varchar(50) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "countries" DROP CONSTRAINT "UQ_fa1376321185575cf2226b1491d"`,
		);
		await queryRunner.query(
			`ALTER TABLE "countries" ALTER COLUMN "name" varchar(50) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "countries" ADD CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name")`,
		);
		await queryRunner.query(
			`ALTER TABLE "regions" ALTER COLUMN "name" varchar(50) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "location-levels" ADD CONSTRAINT "FK_5167cc20782d249100bbda44846" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "location-levels" DROP CONSTRAINT "FK_5167cc20782d249100bbda44846"`,
		);
		await queryRunner.query(
			`ALTER TABLE "regions" ALTER COLUMN "name" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "countries" DROP CONSTRAINT "UQ_fa1376321185575cf2226b1491d"`,
		);
		await queryRunner.query(
			`ALTER TABLE "countries" ALTER COLUMN "name" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "countries" ADD CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name")`,
		);
		await queryRunner.query(
			`ALTER TABLE "provinces" ALTER COLUMN "name" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "districts" ALTER COLUMN "name" nvarchar(255) NOT NULL`,
		);
		await queryRunner.query(`DROP TABLE "location-levels"`);
	}
}
