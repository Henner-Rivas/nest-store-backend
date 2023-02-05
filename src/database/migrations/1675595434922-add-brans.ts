import {MigrationInterface, QueryRunner} from "typeorm";

export class addBrans1675595434922 implements MigrationInterface {
    name = 'addBrans1675595434922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6c687a8fa35b0ae35ce766b56c\` ON \`user\``);
        await queryRunner.query(`CREATE TABLE \`brand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`createAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`brand\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6c687a8fa35b0ae35ce766b56c\` ON \`user\` (\`customerId\`)`);
    }

}
