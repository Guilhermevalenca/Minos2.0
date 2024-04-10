import { Server } from "socket.io";
import socketRoom from "./socketRoom";

const io = new Server(3000, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    // console.log(socket.id);
    socketRoom(io, socket);
});
