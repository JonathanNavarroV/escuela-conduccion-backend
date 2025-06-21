import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export class SeedLocationLevelsChile1750474415180
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		// Se obtiene el ID de Chile
		const chile = await queryRunner.query(`
            SELECT id FROM countries WHERE name = 'Chile'`);
		const chileId = chile[0].id;

		await queryRunner.query(`
            INSERT INTO location_levels (id, [key], label_key, countryId) VALUES ('${uuidv4()}', 'region', 'location.chile.region', '${chileId}')`);

		await queryRunner.query(`
            INSERT INTO location_levels (id, [key], label_key, countryId) VALUES ('${uuidv4()}', 'province', 'location.chile.province', '${chileId}')`);

		await queryRunner.query(`
            INSERT INTO location_levels (id, [key], label_key, countryId) VALUES ('${uuidv4()}', 'district', 'location.chile.district', '${chileId}')`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// Se obtiene el ID de Chile
		const chile = await queryRunner.query(`
            SELECT id FROM countries WHERE name = 'Chile'`);
		const chileId = chile[0].id;

		await queryRunner.query(
			`DELETE FROM location_levels WHERE countryId = '${chileId}'`,
		);
	}
}
