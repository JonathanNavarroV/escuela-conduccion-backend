import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1750049626605 implements MigrationInterface {
	name = "InitialSchema1750049626605";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" ADD "isActive" bit NOT NULL CONSTRAINT "DF_fde2ce12ab12b02ae583dd76c7c" DEFAULT 1`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "user" DROP CONSTRAINT "DF_fde2ce12ab12b02ae583dd76c7c"`,
		);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
	}
}
