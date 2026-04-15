import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../db/data-source"
import { Chats } from "../db/Models/chatModels"
import { HTTPError } from "../utils/exception.util";

// export const chatLists = async (req: Request, res: Response, next: NextFunction) => {

//     // const {userId}=req.body
//     // console.log(userId)
//     const chats = await AppDataSource.getRepository(Chats)
//         .createQueryBuilder("chats")

//         .leftJoinAndSelect("chats.user", "sender")
//         .leftJoinAndSelect("chats.receiver", "receiver")
//         .getMany();

//     // console.log("chats: ",chats)
//     res.status(200).json({ chats }).end()

// }

export const userChatList = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.query.userId
    console.log("userId: ", req.query.userId)
    const chats = await AppDataSource.getRepository(Chats)
        .createQueryBuilder("chats")
        .select([
            "MIN(chats.id) as id",
            'LEAST(chats.userId, chats.receiverId) as sendId',
            'GREATEST(chats.userId, chats.receiverId) as receiverId',
            'MAX(chats.createdAt) as "createdAt"',
            `CASE
                WHEN chats.userId:=userId
                THEN sender.username
                ELSE receiver.username
            END as username`,
            `CASE
                WHEN chats.userId:=userId
                THEN receiver.username
                ELSE sender.username
            END as receiver`
        ])
        .leftJoin("chats.user", "sender")
        .leftJoin("chats.receiver", "receiver")
        // .distinct(true)
        .distinctOn(["sendId", "receiverId"])

        .where("chats.userId=:userId  OR chats.receiverId=:userId", { userId })
        .groupBy("sendId, receiverId, sender.username, receiver.username")
        .getRawMany();
    res.status(200).json({ chats }).end();
}

export const chatMessages = async (req: Request, res: Response, next: NextFunction) => {

    const { userId, receiverId } = req.body
    console.log("user id ", userId, receiverId)
    if (!userId || !receiverId) throw new HTTPError(400, "Require both send ID and receiver ID")
    let chats = await AppDataSource.getRepository(Chats)

        .createQueryBuilder("chats")
        .select(['sender.username as sender', 'chats.createdAt as "createdAt"', 'chats.message as message', 'chats.userId as "userId"', 'chats.receiverId as "receiverId"', 'chats.id as id', 'receiver.username as receiver'])
        .leftJoin("chats.user", "sender")
        .leftJoin("chats.receiver", "receiver")
        // // .from()
        .where("chats.userId=:userId  AND chats.receiverId=:receiverId")
        .orWhere("chats.userId=:receiverId AND chats.receiverId=:userId")
        .setParameters({ userId, receiverId })
        //         .orderBy("chats.createdAt", "ASC")
        .getRawMany();
    // console.log(chats);
    res.status(200).json({ chats }).end();

}
