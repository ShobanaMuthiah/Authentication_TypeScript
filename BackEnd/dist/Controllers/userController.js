"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.loginUser = exports.registerUser = void 0;
exports.oAuth = oAuth;
const google_auth_library_1 = require("google-auth-library");
const exception_util_js_1 = require("../utils/exception.util.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_js_1 = require("../db/Models/userModel.js");
const data_source_js_1 = require("../db/data-source.js");
const userRepository = data_source_js_1.AppDataSource.getRepository(userModel_js_1.UserEntity);
const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!email || !password || !username)
        throw new exception_util_js_1.HTTPError(400, "All fields are required");
    const userExist = await userRepository.findOneBy({ email: email });
    const isMatch = await (userExist === null || userExist === void 0 ? void 0 : userExist.comparePassword(password));
    if (userExist && isMatch)
        throw new exception_util_js_1.HTTPError(400, "UserEntity already exists");
    const user = userRepository.create({
        email,
        password,
        username
    });
    await userRepository.save(user);
    res.status(200).json({ status: "Success", message: "Successfully user registered" }).end();
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        throw new exception_util_js_1.HTTPError(400, "Email or password is required");
    const user = await userRepository.findOneBy({ email: email });
    console.log("user: ", user);
    if (!user)
        throw new exception_util_js_1.HTTPError(400, "UserEntity not found");
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        throw new exception_util_js_1.HTTPError(400, 'Given Password is wrong');
    const accToken = jsonwebtoken_1.default.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = jsonwebtoken_1.default.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({ status: "Success", accessToken: accToken, message: "Logged in Successfully" }).end();
    return;
};
exports.loginUser = loginUser;
const refreshToken = (req, res) => {
    var _a;
    if (!((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt))
        throw new exception_util_js_1.HTTPError(403);
    const refreshToken = req.cookies.jwt;
    if (typeof refreshToken !== 'string')
        throw new exception_util_js_1.HTTPError(400, 'Refresh token must be string');
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new exception_util_js_1.HTTPError(403);
        }
        if (!decoded || typeof decoded === "string")
            throw new exception_util_js_1.HTTPError(403);
        let email = decoded.email;
        const accessToken = jsonwebtoken_1.default.sign({ email: userRepository.findOneBy({ email: email }) }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '5m'
        });
        return res.status(200).json({ accessToken }).end();
    });
};
exports.refreshToken = refreshToken;
async function oAuth(req, res, next) {
    const token = req.body.credential;
    const client = new google_auth_library_1.OAuth2Client();
    const data = await client.verifyIdToken({ idToken: token, audience: "784262751833-nuju8goog74mnckf2euilgb6vqkc4ins.apps.googleusercontent.com" });
    const pa = data.getPayload();
    // res.redirect("http://localhost:5173")
    if (!pa || !pa.email)
        throw new exception_util_js_1.HTTPError(400, "Email id is required");
    const user = await userRepository.findOneBy({ email: pa.email });
    if (!user) {
        const userCreate = userRepository.create({ email: pa.email, username: pa.name });
        await userRepository.save(userCreate);
        res.status(200).json({ status: "Success", message: "Registered Successfully" }).end();
    }
    res.status(200).json({ status: "Success", message: "Logged in Successfully" }).end();
}
