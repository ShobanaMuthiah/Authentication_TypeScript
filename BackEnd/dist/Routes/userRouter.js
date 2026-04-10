"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
const router = express_1.default.Router();
router.post("/LoginForm", userController_1.loginUser);
router.post("/refresh", userController_1.refreshToken);
router.post("/loginOAuth", userController_1.oAuth);
router.post("/register", userController_1.registerUser);
router.get('/getAll', userController_1.getAllUser);
exports.default = router;
