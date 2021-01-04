import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class user1609278701654 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'user',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment',
				},
				{
					name: 'name',
					type: 'varchar',
				},
				{
					name: 'user',
					type: 'varchar',
				},
				{
					name: 'password',
					type: 'varchar',
				}
			],
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('user');
	}
}
