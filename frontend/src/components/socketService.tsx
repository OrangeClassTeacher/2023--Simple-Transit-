import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../utils/types';
import { fromEvent, Observable } from 'rxjs';

export interface SocketService {
    send(message: ChatMessage): void;
    onMessage(): Observable<ChatMessage>;
    disconnect(): void;
}
const socket = io('localhost:3000');

const SocketProvider = () => {
    const [socketService, setSocketService] = useState<SocketService>({
        send: (message: ChatMessage) => {
            console.log('emitting message: ' + message);
            socket.emit('message', message);
        },
        onMessage: () => {
            return fromEvent<ChatMessage>(socket, 'message');
        },
        disconnect: () => {
            socket.disconnect();
        },
    });

    useEffect(() => {
        console.log('initiating socket service');
        setSocketService((prevSocketService) => ({
            ...prevSocketService,
            send: (message: ChatMessage) => {
                console.log('emitting message: ' + message);
                socket.emit('message', message);
            },
            onMessage: () => {
                return fromEvent<ChatMessage>(socket, 'message');
            },
        }));

        return () => {
            socket.disconnect();
        };
    }, []);

};

export default SocketProvider;
