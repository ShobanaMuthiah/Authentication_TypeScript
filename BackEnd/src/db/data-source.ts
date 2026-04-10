import { DataSource, type DataSourceOptions } from "typeorm";
import CONFIGS from "../Config/config";
import MainSeeder from './seeders/index'
import { entities } from './Models/index'
import { UserEntity } from "./Models/userModel";
import { Chats } from "./Models/chatModels";

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
    entities:[UserEntity,Chats],
    migrations:["dist/db/migrations/*.js"],
    // migrations: ["src/db/migrations/*.ts"],
    seeds: MainSeeder,
    // factories: ['dist/db/seeders/factories/*.ts']
    // subscribers:[],
} as DataSourceOptions)
