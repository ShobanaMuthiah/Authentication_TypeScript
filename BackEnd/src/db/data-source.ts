import { DataSource, type DataSourceOptions } from "typeorm";
import CONFIGS from "../Config/config";
import { entities } from './Models/index'

console.log(CONFIGS.DATABASE_URL)

export const AppDataSource = new DataSource({
    type: "postgres",
    url:CONFIGS.DATABASE_URL,
    ssl:true,
    extra:{
        ssl:{
            rejectUnauthorized:false,
        }
    },
    synchronize: true,
    logging: true,
    entities,
    // migrations:["dist/db/migrations/*.js"],
    // // migrations: ["src/db/migrations/*.ts"],
    // seeds: MainSeeder,
    // factories: ['dist/db/seeders/factories/*.ts']
    // subscribers:[],
} as DataSourceOptions)
