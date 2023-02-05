import {MigrationInterface, QueryRunner} from "typeorm";

export class init1675555689627 implements MigrationInterface {
    name = 'init1675555689627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`updateAt\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`createAt\``);
    }

}
