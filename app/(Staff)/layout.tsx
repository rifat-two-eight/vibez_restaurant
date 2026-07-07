'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { currentUser } from '@/redux/features/auth/authSlice';
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://vibezapi.apponislam.top";

export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useSelector(currentUser);

    useEffect(() => {
        if (!user?._id || !user?.restaurantId) return;

        const socket: Socket = io(SOCKET_URL, {
            query: {
                _id: user._id,
                restaurantId: user.restaurantId
            },
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true
        });

        socket.on("connect", () => {
            console.log("🔌 Staff is now online! Socket ID:", socket.id);
        });

        return () => {
            socket.disconnect();
        };
    }, [user?._id, user?.restaurantId]);

    return <>{children}</>;
}
