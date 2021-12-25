import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
const socketServer = process.env.REACT_APP_API_LINK;

export function useQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const SocketIOContext = createContext({
	addNewUser: async () => {},
	user: null,
	logOut: async () => {},
	socket: null,
});

export function useSocket() {
	return useContext(SocketIOContext);
}

export function SocketIOProvider({ children }) {
	const [socket, setSocket] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		setSocket(
			io(socketServer, {
				withCredentials: true,
				transports: ["websocket", "polling", "flashsocket"],
			})
		);
	}, []);

	const addNewUser = async (newUser) => {
		if (!user) {
			return setUser(newUser);
		}
	};

	useEffect(() => {
		if (user && socket) {
			socket?.emit("newUser", user.id);
		}
	}, [socket, user]);

	const logOut = async () => {
		if (user) {
			setUser(null);
			socket?.emit("logOut");
		}
	};

	const value = {
		addNewUser,
		user,
		logOut,
		socket,
	};

	return <SocketIOContext.Provider value={value}>{children}</SocketIOContext.Provider>;
}
