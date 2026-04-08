import { DataSource } from "typeorm";
import CONFIGS from "./config.js";
// import { User } from "../Models/userModel.js";
// import { PostRefactoring1773301061734 } from "src/db/migrations/1773301061734-post-refactoring.js";
console.log(CONFIGS);
export const AppDataSource = new DataSource({
    type: "postgres",
    host: CONFIGS.HOST,
    username: CONFIGS.DB_USER,
    password: CONFIGS.DB_PASSWORD,
    database: CONFIGS.DATABASE,
    synchronize: false,
    logging: true,
    entities: ["src/Models/**/*.ts"],
    migrations: ["src/db/migrations/*.ts"],
    seeds: ['dist/db/seeders/*.ts'],
    factories: ['dist/db/factories/*.ts']
    // subscribers:[],
});
