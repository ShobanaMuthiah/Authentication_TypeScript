import { DataSource, type DataSourceOptions } from "typeorm";
import CONFIGS from "../Config/config";
import MainSeeder from './seeders/index'
import { entities } from './Models/index'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: CONFIGS.HOST,
    username: CONFIGS.DB_USER,
    password: CONFIGS.DB_PASSWORD,
    database: CONFIGS.DATABASE,
    synchronize: true,
    logging: true,
    entities,
    // migrations: ["src/db/migrations/*.ts"],
    seeds: MainSeeder,
    // factories: ['dist/db/seeders/factories/*.ts']
    // subscribers:[],
} as DataSourceOptions)
