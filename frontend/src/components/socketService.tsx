import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatMessage } from '../utils/types';
import { fromEvent, Observable } from 'rxjs';

export interface SocketService {
    send(message: ChatMessage): void;
    onMessage(): Observable<ChatMessage>;
    disconnect(): void;
}

export const SocketContext = createContext<SocketService | null>(null);

export const useSocket = (): SocketService => {
    const socket = useContext(SocketContext);

    if (!socket) {
        throw new Error('SocketContext not found');
    }

    return socket;
};

const socket = io('localhost:8080');

interface SocketProviderProps {
    children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
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

    return (
        <SocketContext.Provider value={socketService}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
