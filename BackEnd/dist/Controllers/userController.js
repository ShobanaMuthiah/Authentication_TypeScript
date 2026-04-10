"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.loginUser = exports.registerUser = exports.getAllUser = void 0;
exports.oAuth = oAuth;
const google_auth_library_1 = require("google-auth-library");
const exception_util_1 = require("../utils/exception.util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../db/Models/userModel");
const data_source_1 = require("../db/data-source");
const userRepository = data_source_1.AppDataSource.getRepository(userModel_1.UserEntity);
const generateTokens = (email) => {
    const accessToken = jsonwebtoken_1.default.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
    const refreshToken = jsonwebtoken_1.default.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
    return { accessToken, refreshToken };
};
const getAllUser = async (req, res, next) => {
    const users = await userRepository
        .createQueryBuilder("users")
        .select(['id', 'email', 'username'])
        .getRawMany();
    res.status(200).json(users);
};
exports.getAllUser = getAllUser;
const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!email || !password || !username)
        throw new exception_util_1.HTTPError(400, "All fields are required");
    const userExist = await userRepository.findOneBy({ email: email });
    const isMatch = await userExist?.comparePassword(password);
    if (userExist && isMatch)
        throw new exception_util_1.HTTPError(400, "UserEntity already exists");
    const user = userRepository.create({
        email,
        password,
        username,
    });
    await userRepository.save(user);
    const { accessToken, refreshToken } = generateTokens(email);
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({ status: "Success", accessToken, user: { id: user.id, username: user.username, email: user.email }, message: "Successfully user registered" }).end();
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        throw new exception_util_1.HTTPError(400, "Email or password is required");
    const user = await userRepository.findOneBy({ email: email });
    console.log("user: ", user);
    if (!user)
        throw new exception_util_1.HTTPError(400, "UserEntity not found");
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        throw new exception_util_1.HTTPError(400, 'Given Password is wrong');
    const { accessToken, refreshToken } = generateTokens(email);
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        status: "Success", accessToken: accessToken, message: "Logged in Successfully",
        user: { id: user.id, username: user.username, email: user.email }
    }).end();
    return;
};
exports.loginUser = loginUser;
const refreshToken = (req, res) => {
    if (!req.cookies?.jwt)
        throw new exception_util_1.HTTPError(403);
    const refreshToken = req.cookies.jwt;
    if (typeof refreshToken !== 'string')
        throw new exception_util_1.HTTPError(400, 'Refresh token must be string');
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            throw new exception_util_1.HTTPError(403);
        }
        if (!decoded || typeof decoded === "string")
            throw new exception_util_1.HTTPError(403);
        let email = decoded.email;
        const accessToken = jsonwebtoken_1.default.sign({ email: userRepository.findOneBy({ email: email }) }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '5m'
        });
        // const user = userRepository.findOneBy({ email: email })
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
        throw new exception_util_1.HTTPError(400, "Email id is required");
    const user = await userRepository.findOneBy({ email: pa.email });
    const { accessToken, refreshToken } = generateTokens(pa.email);
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    let userId;
    if (!user) {
        const userCreate = userRepository.create({ email: pa.email, username: pa.name });
        await userRepository.save(userCreate);
        userId = userRepository.findOneBy({ email: pa.email });
        res.status(200).json({ status: "Success", accessToken, user: { email: pa.email, username: pa.name }, message: "Registered Successfully" }).end();
    }
    res.status(200).json({ status: "Success", accessToken, message: "Logged in Successfully" }).end();
}
