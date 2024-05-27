// src/utils/websocket.ts
let socket: WebSocket;

export const connectWebSocket = (url: string, onMessage: (message: any) => void) => {
    socket = new WebSocket(url); // 웹소켓 연결

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
};

export const sendMessageWebSocket = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
};

export const disconnectWebSocket = () => {
    if (socket) {
        socket.close();
    }
};
