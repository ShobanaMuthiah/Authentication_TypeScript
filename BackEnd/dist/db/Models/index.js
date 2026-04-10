"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const chatModels_1 = require("./chatModels");
const userModel_1 = require("./userModel");
exports.entities = [userModel_1.UserEntity, chatModels_1.Chats];
exports.default = {
    UserEntity: userModel_1.UserEntity,
    Chats: chatModels_1.Chats,
};
