import { AppDataSource } from "../db/data-source"
import { Chats } from "../db/Models/chatModels"

export const saveMessage = async (message: string, userId: number,receiverId: number) => {

    const repo = AppDataSource.getRepository(Chats)

    const chat = repo.create({
        message,
        userId,
        receiverId
    })

 return await repo.save(chat)
}