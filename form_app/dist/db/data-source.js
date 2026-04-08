"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const config_js_1 = __importDefault(require("../Config/config.js"));
const index_js_1 = __importDefault(require("./seeders/index.js"));
const index_js_2 = require("./Models/index.js");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config_js_1.default.HOST,
    username: config_js_1.default.DB_USER,
    password: config_js_1.default.DB_PASSWORD,
    database: config_js_1.default.DATABASE,
    synchronize: false,
    logging: true,
    entities: index_js_2.entities,
    migrations: ["src/db/migrations/*.ts"],
    seeds: index_js_1.default,
    factories: ['dist/db/seeders/factories/*.ts']
    // subscribers:[],
});
