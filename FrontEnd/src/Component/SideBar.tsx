import React, { useEffect, useState } from "react";
import { Avatar, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, TextInput } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { api } from "../utils/api";
// import axios from "axios";

interface UserProps {
  id: number;
  username: string;
  receiverid: number;
  receiver: string;
  sendid: number;
}

interface SideBarProps {
  currentUserId: number;
  currentUser: string;
  onChatSelect: (userId: number, receiverId: number, receiverName: string, messages: any[]) => void;
  activeChatId: number | null;
}

export default function SideBar({ currentUserId, currentUser, onChatSelect, activeChatId }: SideBarProps) {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [searchUser, setSearchUser] = useState<string>("")
  const [newchat, setNewchat] = useState<boolean>(false)
  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("current :", currentUserId)
        const res = await api.get("/chat/userchat", {
          params: { userId: currentUserId }
        });
        let chats = res.data.chats;
        if (chats.length === 0) {
          setNewchat(true);
          setUsers([]);
          return;
        }
        setNewchat(false)


        setUsers(chats);

        console.log("users: ", users)
      } catch (error) {
        console.error("Failed to load chats", error);
      }
    };

    fetchChats();
  }, [currentUserId]);

  useEffect(() => {
    const delay = setTimeout(async () => {

      if (!searchUser.trim()) {
        try {
          const res = await api.get("/chat/userchat", {
            params: { userId: currentUserId }
          });

          setUsers(res.data.chats || []);
        } catch (err) {
          console.error("Reload chats failed", err);
        }

        return;
      }

      try {
        const res = await api.get("/user/search", {
          params: {
            query: searchUser,
            currentUserId
          }
        });

        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }

    }, 400);

    return () => clearTimeout(delay);

  }, [searchUser, currentUserId]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchUser(e.target.value);
  };

  const handleUserClick = async (selectedUser: UserProps) => {
    try {
      console.log("selected user: ", selectedUser)
      let receiver_id
      if (!selectedUser.sendid) {
        receiver_id = selectedUser.id
      }
      else if (selectedUser.sendid && currentUserId === selectedUser.sendid) {
        receiver_id = selectedUser.receiverid
      }
      else {
        receiver_id = selectedUser.sendid
      }

      const payload = { userId: currentUserId, receiverId: receiver_id };
      const res = await api.post("/chat/getChat", payload);
      console.log("user props: ", selectedUser)
      if (res.data.chats) {
        onChatSelect(selectedUser.id, receiver_id, selectedUser.username, res.data.chats);
      }
    } catch (error) {
      console.error("Error opening chat", error);
    }
  };
  return (
    <Sidebar aria-label="Chat sidebar" className="h-full w-full">
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            className="py-4 font-bold text-gray-800 dark:text-white"
            onClick={() => setNewchat(!newchat)}
          >

            <div className="flex items-center gap-2">
              <Avatar
                placeholderInitials={currentUser?.charAt(0).toUpperCase()}
                rounded
                size="sm"
              />
              <span>New Chat</span>
            </div>
          </SidebarItem>
          {newchat && (
            <div className="px-4 py-2">
              <TextInput id='new_chat' type="text" placeholder="Search User" value={searchUser} onChange={(e) => handleChange(e)} />


            </div>)}
          <div className="px-5 py-4 text-xl font-bold text-gray-800 dark:text-white">Chats</div>

          {users.map((u) => (
            <SidebarItem
              key={u.id}
              onClick={() => handleUserClick(u)}
              className={`cursor-pointer ${activeChatId === u.id ? 'bg-blue-100 dark:bg-gray-700' : ''}`}
              icon={HiUser}
              label={""}
              labelColor="success"
            >
              {u.sendid ?
                u.receiver:
                u.username}
            </SidebarItem>
          ))}

          {users.length === 0 && newchat && (
            <div className="p-4 text-sm text-center text-gray-500">
              Start New Conversation
            </div>
          )}

          {users.length === 0 && !newchat && (
            <div className="p-4 text-sm text-center text-gray-500">
              No chats yet
            </div>
          )}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}