import { DataSource, type DataSourceOptions } from "typeorm";
import CONFIGS from "../Config/config";
import MainSeeder from './seeders/index'
import { entities } from './Models/index'

export const AppDataSource = new DataSource({
    type: "postgres",
    url:CONFIGS.DATABASE_URL,
    ssl:true,
    extra:{
        ssl:{
            rejectUnauthorized:false,
        }
    },
    synchronize: false,
    logging: false,
    entities:["dist/Models/*.js"],
    migrations:["dist/db/migrations/*.js"],
    // migrations: ["src/db/migrations/*.ts"],
    seeds: MainSeeder,
    // factories: ['dist/db/seeders/factories/*.ts']
    // subscribers:[],
} as DataSourceOptions)
