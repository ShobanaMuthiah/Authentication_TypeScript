import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./userModel";


@Entity('chats')
export class Chats {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    message: string

    @Column({ name: 'user_id' })
    userId: number

    @ManyToOne(() => UserEntity, (sentUser) => sentUser.sender)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @Column({ name: 'receiver_id' })
    receiverId: number

    @ManyToOne(() => UserEntity, (receivedUser) => receivedUser.receiver)
    @JoinColumn({ name: 'receiver_id' })
    receiver: UserEntity

    @CreateDateColumn()
    createdAt: Date
}