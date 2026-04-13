import express from "express";
import type { NextFunction, Request, Response } from "express"
import userRoute from "./Routes/userRouter";
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { HTTPError } from "./utils/exception.util";
import { AppDataSource } from "./db/data-source";
import CONFIGS from "./Config/config";
import { Server } from "socket.io";
import { createServer } from "node:http";
import chatRouter from "./Routes/chatRouter";
import { saveMessage } from "./Sockets/chatSockets";
// import { saveMessage } from "./Controllers/chatController";
const app = express();

const httpServer = createServer(app);
AppDataSource.initialize()
const io = new Server(httpServer, {
    cors: {
        origin: ["https://chat-app-type-script.vercel.app"],
        methods:["GET","POST"],
        credentials: true
    }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())
app.use(cors(
    {
        origin: "https://chat-app-type-script.vercel.app",
        methods: ['get', 'post', 'patch', 'put', 'delete'],
        credentials: true
    }
))

io.on("connection", (socket) => {
    console.log("Server is connecting", socket.id)
    socket.on("join", (userId) => {
        socket.join(userId)

    })

    socket.on("sendMessage", async (data) => {

        const { message, userId, receiverId } = data

        const savedMessage =
            await saveMessage(
                message,
                userId,
                receiverId
            )

        console.log({ savedMessage })
        // io.emit("receiveMessage", savedMessage)
        // io.to(receiverId).emit("receiveMessage",savedMessage)

        io.to(receiverId).emit("receiveMessage", savedMessage)

        io.to(userId).emit("receiveMessage",savedMessage)
    })
    socket.on("disconnect", () => {
        console.log("user disconnected")
    })


})



app.get("/", (req, res) => {
    console.log("home page")
    res.send("home page")
    res.end()
})

app.use("/user", userRoute)
app.use("/chat", chatRouter)


function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(res)
    }

    let message = "Internal Server Error", status = 500
    if (err instanceof HTTPError) {
        message = err.message
        status = err.status

    }
    if (err instanceof Error) {
        message = err.message
    }

    res.status(status).json({ message }).end()
}

app.use(errorHandler)


httpServer.listen(CONFIGS.PORT)