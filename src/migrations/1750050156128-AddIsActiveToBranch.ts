import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToBranch1750050156128 implements MigrationInterface {
    name = 'AddIsActiveToBranch1750050156128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch" ADD "isActive" bit NOT NULL CONSTRAINT "DF_eba966876550e78add904e33c2e" DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "DF_eba966876550e78add904e33c2e"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "isActive"`);
    }

}
