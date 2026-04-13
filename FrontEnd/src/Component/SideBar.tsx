import React, { useEffect, useState } from "react";
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, TextInput } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { api } from "../utils/api";
// import axios from "axios";

interface UserProps {
  id: number;
  username: string;
  receiverid:number;
  receiver:string;
  userId:number;
}

interface SideBarProps {
  currentUserId: number;
  onChatSelect: (userId: number, receiverId: number,receiverName:string, messages: any[]) => void;
  activeChatId: number | null;
}

export default function SideBar({ currentUserId, onChatSelect, activeChatId }: SideBarProps) {
  console.log("current user id: ",currentUserId)
  const [users, setUsers] = useState<UserProps[]>([]);
  const [searchUser,setSearchUser]=useState<string>("")
  const [newchat,setNewchat]=useState<boolean>(false)
  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("current :",currentUserId)
        const res = await api.get("/chat/userchat",{
          params:{userId:currentUserId}
        });
        let chats = res.data.chats;
if(chats.length===0){
  const response=await api.get('/user/getAll')
  chats=response.data
  console.log(chats)
const payloads = chats.map((e: any) => ({
  id: e.id,
  // userId:e.id,
  receiverid:e.id,
  username: e.username
}));
  setUsers(payloads)
  setNewchat(true)
console.log("users: ",users,newchat)

  return;
}
setNewchat(false)


        setUsers(chats);

console.log("users: ",users)
      } catch (error) {
        console.error("Failed to load chats", error);
      }
    };

    fetchChats();
  }, [currentUserId]);


const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  setSearchUser(e.target.value)
}

  const handleUserClick = async (selectedUser: UserProps) => {
    try {
      console.log("selected user: ",selectedUser)
      let receiver_id
      if(!selectedUser.userId){
        receiver_id=selectedUser.id
      }
      else if(selectedUser.userId && currentUserId===selectedUser.userId){
        receiver_id=selectedUser.receiverid}
      else{
        receiver_id=selectedUser.userId}

      const payload = { userId: currentUserId, receiverId: receiver_id };
      const res = await api.post("/chat/getChat", payload);
      console.log("user props: ",selectedUser)
      if (res.data.chats) {
        onChatSelect(selectedUser.id, receiver_id, selectedUser.username,res.data.chats);
      }
    } catch (error) {
      console.error("Error opening chat", error);
    }
  };
  return (
    <Sidebar aria-label="Chat sidebar" className="h-full w-full">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem  className=" py-4 font-bold text-gray-800 dark:text-white">
            New Chat
          </SidebarItem>
          <div className="hidden">
          <TextInput id='new_chat' type="text" placeholder="Search User" value={searchUser} onChange={(e)=>handleChange(e)}/>
          

          </div>
<div className="px-5 py-4 text-xl font-bold text-gray-800 dark:text-white">Chats</div>
         
           { users.map((u) => (
            <SidebarItem
              key={u.id}
              onClick={() => handleUserClick(u)}
              className={`cursor-pointer ${activeChatId === u.id ? 'bg-blue-100 dark:bg-gray-700' : ''}`}
              icon={HiUser}
              label={""}
              labelColor="success"
            >
              {u.userId===currentUserId?u.receiver:u.username}
            </SidebarItem>
          ))}
          
     
          {users.length === 0 && <div className="p-4 text-sm text-center text-gray-500">No chats yet</div>}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}