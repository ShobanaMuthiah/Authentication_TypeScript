"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_js_1 = __importDefault(require("./Routes/userRouter.js"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const exception_util_js_1 = require("./utils/exception.util.js");
const data_source_js_1 = require("./db/data-source.js");
const config_js_1 = __importDefault(require("./Config/config.js"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const app = (0, express_1.default)();
const httpServer = (0, node_http_1.createServer)(app);
data_source_js_1.AppDataSource.initialize();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ['get', 'post', 'patch', 'put', 'delete'],
    credentials: true
}));
io.on("connection", (socket) => {
    console.log("Server is connecting", socket.id);
});
io.on('message', (d) => {
    console.log(d);
});
app.get("/", (req, res) => {
    console.log("home page");
    res.send("home page");
    res.end();
});
app.use("/user", userRouter_js_1.default);
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(res);
    }
    let message = "Internal Server Error", status = 500;
    if (err instanceof exception_util_js_1.HTTPError) {
        message = err.message;
        status = err.status;
    }
    if (err instanceof Error) {
        message = err.message;
    }
    res.status(status).json({ message }).end();
}
app.use(errorHandler);
httpServer.listen(config_js_1.default.PORT);
