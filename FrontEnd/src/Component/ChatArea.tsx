import  { useEffect, useState, useRef } from 'react';
import { Button } from 'flowbite-react';
import { socket } from '../utils/socket';
// import axios from 'axios';

interface Message {
  id: number;
  userId: number;
  receiverId: number;
  message: string;
  createdAt: string;
}

interface ChatAreaProps {
  initialMessages: Message[];
  currentUserId: number;
  otherUserId: number;
  receiverName:string;
  currentUsername: string;
}

export default function ChatArea({ initialMessages, currentUserId, otherUserId,receiverName }: ChatAreaProps) {
  console.log("initial message: ",initialMessages,currentUserId,otherUserId)
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [msg, setMsg] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
// console.log("receiver name: ",currentUsername)
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, otherUserId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(():any => {
    const handleReceiveMessage = (data: Message) => {
      const isRelevant = 
        (data.userId === currentUserId && data.receiverId === otherUserId) ||
        (data.userId === otherUserId && data.receiverId === currentUserId);

      if (isRelevant) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [currentUserId, otherUserId]);

  const sendMessage = () => {
    if (msg.trim()) {
      socket.emit('sendMessage', {
        message: msg,
        userId: currentUserId,
        receiverId: otherUserId
      });

      setMsg("");
    }
  };

  return (
    <div className='flex-1 flex flex-col relative bg-white dark:bg-gray-800 h-full overflow'>

      <div className="p-4 border-b dark:border-gray-700 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
          {receiverName[0].toUpperCase()}
        </div>
      </div>

      <div className='flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-900'>
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.userId === currentUserId ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] text-sm p-3 px-4 rounded-xl ${
              m.userId === currentUserId 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700'
            }`}>
              <p>{m.message}</p>
              <span className={`text-[10px] block mt-1 opacity-70 ${m.userId === currentUserId ? 'text-blue-100' : 'text-gray-400'}`}>
                {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className='p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 flex gap-2'>
        <textarea
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          placeholder="Type a message..."
          rows={1}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
        />
        <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
          Send
        </Button>
      </div>
    </div>
  );
}