"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CONFIGS = Object.freeze({
    PORT: process.env.PORT ?? 5000,
    DATABASE_URL: process.env.DATABASE_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    HOST: process.env.HOST ?? 'localhost',
    DB_PORT: process.env.DB_PORT ?? 5432,
    DB_USER: process.env.DB_USER ?? 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD ?? 1234,
    DATABASE: process.env.DATABASE ?? "login_db",
});
exports.default = CONFIGS;
