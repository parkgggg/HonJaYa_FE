import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';
import { fetchMessages, sendMessage, deleteMessage } from '../../api/chatApi';
import { connectWebSocket, sendMessageWebSocket, disconnectWebSocket } from '../../api/websocket';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

interface ChatWindowProps {
    roomId: string;
    isGroupChat: boolean;
}

interface Message {
    roomId: string;
    messageId: string;
    content: string;
    isOwnMessage: boolean;
    timestamp: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ roomId, isGroupChat }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const stompClient = useRef<CompatClient>();

    useEffect(() => {
        const loadMessages = async () => {
            const messages = await fetchMessages(roomId);
            setMessages(messages);
        };
        // loadMessages();

        const handleNewMessage = (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        if (isGroupChat) {
            const eventSource = new EventSource(`https://your-server.com/sse/chat/${chatId}`);
            eventSource.onmessage = (event) => {
                const message: Message = JSON.parse(event.data);
                handleNewMessage(message);
            };
            return () => {
                eventSource.close();
            };
        } else {
            //소켓 열고, stomp에 얹기
            const socket = new SockJS('http://localhost:8080/ws');
            stompClient.current = Stomp.over(socket);

            //stomp 토픽 연결 및 메시지 콜백 함수
            const connectCallback = (frame:any) => {
                stompClient.current?.subscribe('/topic/chat/${chatId}', (message) => {
                    console.log('Received message: ', message.body);
                    // setMessages(message.body)
                });
            };
            //위 함수랑 소켓 얹은 stomp 연결
            stompClient.current.connect({}, connectCallback);

            // connectWebSocket(`wss://your-websocket-server.com/chat/${roomId}`, handleNewMessage);
            return () => {
                stompClient.current?.disconnect(()=>{console.log("연결 끝")});
            };
        }
    }, [roomId, isGroupChat]);

    const handleSendMessage = async (message: string) => {
        const newMessage: Message = { roomId: roomId, messageId: `${Date.now()}`, content: message, isOwnMessage: true, timestamp: new Date().toLocaleTimeString() };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        if (isGroupChat) {
            await sendMessage({ roomId: roomId, content: message });
        } else {
            stompClient.current?.send(`/app/chat.send/${roomId}`, {}, JSON.stringify(message));

        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        await deleteMessage(roomId, messageId);
        setMessages((prevMessages) => prevMessages.filter(msg => msg.messageId !== messageId));
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-y-auto p-4">
                {messages.map((msg, index) => (
                    <ChatMessage
                        key={index}
                        message={msg.content}
                        isOwnMessage={msg.isOwnMessage}
                        timestamp={msg.timestamp}
                        onDelete={() => handleDeleteMessage(msg.messageId)}
                    />
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
