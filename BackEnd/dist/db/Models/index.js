"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const chatModels_js_1 = require("./chatModels.js");
const userModel_js_1 = require("./userModel.js");
exports.entities = [userModel_js_1.UserEntity, chatModels_js_1.Chats];
exports.default = {
    UserEntity: userModel_js_1.UserEntity,
    Chats: chatModels_js_1.Chats,
};
