"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CONFIGS = Object.freeze({
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    HOST: (_b = process.env.HOST) !== null && _b !== void 0 ? _b : 'localhost',
    DB_PORT: (_c = process.env.DB_PORT) !== null && _c !== void 0 ? _c : 5432,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DATABASE,
});
exports.default = CONFIGS;
