import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Chats } from "./chatModels";


@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    console.log("hashing password")
    if (this.password) this.password = await bcrypt.hash(this.password, 10)
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password)
  }

  @Column()
  username: string

  @OneToMany(() => Chats, (sentChat) => sentChat.user)
  sender: Chats[]

  @OneToMany(() => Chats, (receivedChat) => receivedChat.receiver)
  receiver: Chats[]
}