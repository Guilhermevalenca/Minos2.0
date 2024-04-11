import { Server } from "socket.io";
import socketRoom from "./socketRoom";
import SocketPlayers from "./SocketPlayers";

const io = new Server(3000, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    // console.log(socket.id);
    socketRoom(io, socket);
    SocketPlayers(io, socket);
});
