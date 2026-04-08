"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration1773644435002 = void 0;
class Migration1773644435002 {
    constructor() {
        this.name = 'Migration1773644435002';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
    }
}
exports.Migration1773644435002 = Migration1773644435002;
