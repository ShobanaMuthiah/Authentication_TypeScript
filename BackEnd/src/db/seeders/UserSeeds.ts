import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { UserEntity } from "../Models/userModel";

export default class UserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(UserEntity);
        await repository.insert([
            { username: "test", email: "test@gmail.com", password: "test" },
            { username: "test2", email: "test2@gmail.com", password: "test2" },

        ])

        const userFactory = factoryManager.get(UserEntity);
        await userFactory.saveMany(10);
    }
}