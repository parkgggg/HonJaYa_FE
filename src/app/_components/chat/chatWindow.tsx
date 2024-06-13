import React, { useEffect, useState } from 'react';
import ChatMessage from './chatMessage';
import ChatInput from './chatInput';

interface ChatWindowProps {
    chatId: string;
    isGroupChat: boolean;
}

interface Message {
    id: string;
    msg: string;
    sender: string;
    receiver: string;
    roomNum: number;
    isOwnMessage: boolean;
    createAt: string;
}

// 로그인 시스템 대신 임시 방편
let username = prompt("아이디를 입력하세요");
let roomNum = prompt("채팅방 번호를 입력하세요");

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, isGroupChat }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const usernameElement = document.querySelector("#username");
        if (usernameElement) {
            usernameElement.innerHTML = username || "unknown user";
        }

        const handleNewMessage = (message: any) => {
            const formattedMessage: Message = {
                id: message.id,
                msg: message.msg,
                sender: message.sender,
                receiver: message.receiver,
                roomNum: message.roomNum,
                isOwnMessage: message.sender === username,
                createAt: message.createAt,
            };
            setMessages((prevMessages) => [...prevMessages, formattedMessage]);
        };

        const eventSource = new EventSource(`http://localhost:8081/chat/roomNum/${roomNum}`);
        eventSource.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                handleNewMessage(message);
            } catch (error) {
                console.error('Failed to parse message:', error);
            }
        };
        eventSource.onerror = (error) => {
            console.error('EventSource error:', error);
        };
        return () => {
            eventSource.close();
        };
    }, [chatId, roomNum, username]);

    const handleSendMessage = async (message: string) => {
        const newMessage = {
            id: `${Date.now()}`,
            msg: message,
            sender: username,
            receiver: "", // 수신자 이름 필요
            roomNum: roomNum,
            isOwnMessage: true,
            createAt: new Date().toISOString(),
        };

        try {
            await fetch("http://localhost:8081/chat", { // 때에따라 바꾸자 8080->8081로 현재 변경
                method: "POST",
                body: JSON.stringify(newMessage),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            });
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div id="chat-box" className="flex-grow overflow-y-auto p-4">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500">No messages yet</div>
                ) : (
                    
                    // ChatMessage 컴포넌트에 각 메시지의 속성을 props로 전달하여 해당 메시지를 렌더링한다.
                    messages.map((msg, index) => {
                        const nextMsg = messages[index + 1]; // 다음 메시지
                        const isLast = 
                            !nextMsg ||  // 다음 메시지가 없거나
                            nextMsg.sender !== msg.sender ||  // 다음 메시지의 발신자가 현재 메시지의 발신자와 다르거나
                            new Date(msg.createAt).getMinutes() !== new Date(nextMsg.createAt).getMinutes(); // 분이 다르면
                                return(
                                    <ChatMessage
                                        key={index}
                                        message={msg.msg}
                                        sender={msg.sender}
                                        isOwnMessage={msg.isOwnMessage}
                                        timestamp={msg.createAt}
                                        onDelete={() => {}} // 삭제 기능 필요시 추가
                                        isLast={isLast}
                                    />
                                )
                            })
                    )}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;