"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../Config/config"));
const index_1 = __importDefault(require("./seeders/index"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: config_1.default.DATABASE_URL,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        }
    },
    synchronize: false,
    logging: false,
    entities: ["dist/Models/*.js"],
    migrations: ["dist/db/migrations/*.js"],
    // migrations: ["src/db/migrations/*.ts"],
    seeds: index_1.default,
    // factories: ['dist/db/seeders/factories/*.ts']
    // subscribers:[],
});
