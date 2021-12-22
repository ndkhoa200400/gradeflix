import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
const socketServer = process.env.REACT_APP_SOCKET_LINK;

export function useQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const SocketIOContext = createContext({
	addNewUser: async () => { },
	user: null,
	logOut: async () => {}
})

export function useSocket() {

	return useContext(SocketIOContext)
}

export function SocketIOProvider({ children }) {
	const [socket, setSocket] = useState(null);
	const [user, setUser] = useState(null);


	useEffect(() => {
		setSocket(io(socketServer, {
			withCredentials: true,
			transports: ['websocket', 'polling', 'flashsocket']
		}));
	}, []);

	const addNewUser = async (newUser) => {
		if (!user) {
			socket?.emit('newUser', newUser.id)
			return setUser(newUser)
		}

	}


	const logOut = async () => {
		if (user) {
			setUser(null)
			socket?.emit('logOut')
		}
	}

	const value = {
		addNewUser,
		user,logOut
	}


	return <SocketIOContext.Provider value={value}>{children}</SocketIOContext.Provider>
}
