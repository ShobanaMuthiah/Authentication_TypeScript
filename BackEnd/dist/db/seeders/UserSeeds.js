"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_js_1 = require("../Models/userModel.js");
class UserSeeder {
    async run(dataSource, factoryManager) {
        const repository = dataSource.getRepository(userModel_js_1.UserEntity);
        await repository.insert([
            { username: "test", email: "test@gmail.com", password: "test" },
            { username: "test2", email: "test2@gmail.com", password: "test2" },
        ]);
        const userFactory = factoryManager.get(userModel_js_1.UserEntity);
        await userFactory.saveMany(10);
    }
}
exports.default = UserSeeder;
