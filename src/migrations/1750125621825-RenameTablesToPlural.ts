import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTablesToPlural1750125621825 implements MigrationInterface {
	name = "RenameTablesToPlural1750125621825";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`EXEC sp_rename 'user', 'users';`);
		await queryRunner.query(`EXEC sp_rename 'branch', 'branches';`);
		await queryRunner.query(
			`EXEC sp_rename 'user_branches_branch', 'users_branches_branches';`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`EXEC sp_rename 'users', 'user';`);
		await queryRunner.query(`EXEC sp_rename 'branches', 'branch';`);
		await queryRunner.query(
			`EXEC sp_rename 'users_branches_branches', 'user_branches_branch';`,
		);
	}
}
