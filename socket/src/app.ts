import {Server, Socket} from "socket.io";
import socketRoom from "./socketRoom";
import SocketPlayers from "./SocketPlayers";
import SocketGame from "./SocketGame";

const io: Server<any> = new Server(3000, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket: Socket<any>) => {
    // console.log(socket.id);
    socketRoom(io, socket);
    SocketPlayers(io, socket);
    SocketGame(io, socket);
});
