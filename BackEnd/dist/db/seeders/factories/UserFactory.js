"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_extension_1 = require("typeorm-extension");
const userModel_js_1 = require("../../Models/userModel.js");
exports.default = (0, typeorm_extension_1.setSeederFactory)(userModel_js_1.UserEntity, (faker) => {
    const user = new userModel_js_1.UserEntity();
    user.username = faker.person.fullName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;
});
