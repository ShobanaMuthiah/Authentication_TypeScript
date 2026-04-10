import { useState } from 'react';
import SideBar from '../Component/SideBar';
import ChatArea from '../Component/ChatArea';
import {  useSelector } from 'react-redux';
import type { RootState } from '../Context/store';

export default function Dashboard() {
  // const { user } = useAuth();
  const user=useSelector((state:RootState)=>state.user.user)
  // const dispatch=useDispatch();
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [otherUserId, setOtherUserId] = useState<number>(0);
  const [receiverName,setReceiverName]=useState<string>("")

  const handleChatSelect = (userId: number, receiverId: number, receiverName:string,messages: any[]) => {
    setActiveChatId(userId);
    setOtherUserId(receiverId);
    setChatMessages(messages);
    setReceiverName(receiverName)
  // console.log("messages: ",messages)

  };

  if (!user) return <div>User not found</div>;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 ">

      <div className="w-80  border-r dark:border-gray-700">
        <SideBar 
          currentUserId={user.id} 
          onChatSelect={handleChatSelect} 
          activeChatId={activeChatId}
        />
      </div>

      <div className="flex-1 flex flex-col h-full relative">
        {activeChatId ? (
          <ChatArea 
            initialMessages={chatMessages} 
            currentUserId={user.id} 
            otherUserId={otherUserId}
            receiverName={receiverName}
            currentUsername={user.username}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}