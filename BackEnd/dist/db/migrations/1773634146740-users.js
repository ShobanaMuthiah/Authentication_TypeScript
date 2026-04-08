"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1773634146740 = void 0;
class Users1773634146740 {
    constructor() {
        this.name = 'Users1773634146740';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying, "username" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.Users1773634146740 = Users1773634146740;
