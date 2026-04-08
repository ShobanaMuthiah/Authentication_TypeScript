"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessage = void 0;
const data_source_js_1 = require("../db/data-source.js");
const chatModels_js_1 = require("../db/Models/chatModels.js");
const chatRepository = data_source_js_1.AppDataSource.getRepository(chatModels_js_1.Chats);
const chatMessage = async (req, res, next) => {
};
exports.chatMessage = chatMessage;
