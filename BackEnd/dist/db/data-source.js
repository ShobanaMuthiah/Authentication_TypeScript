"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const userModel_1 = require("./Models/userModel");
const chatModels_1 = require("./Models/chatModels");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        }
    },
    synchronize: true,
    logging: true,
    entities: [userModel_1.UserEntity, chatModels_1.Chats],
    // migrations:["dist/db/migrations/*.js"],
    // // migrations: ["src/db/migrations/*.ts"],
    // seeds: MainSeeder,
    // factories: ['dist/db/seeders/factories/*.ts']
    // subscribers:[],
});
