// hooks/useSocket.ts
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

function useSocket(socketUrl: string): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(socketUrl);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("🔌 Connected to Flask via Socket.IO");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [socketUrl]);

  return socket;
}

export default useSocket;