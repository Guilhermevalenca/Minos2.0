import IPlayer from "./interfaces/IPlayer";

export default function (io: any, socket: any): void {
    socket.on('join_room', (data: string) => {
        if(!!io.sockets.adapter.rooms.get(data)) {
            if(io.sockets.adapter.rooms.get(data).size < 2) {
                socket.join(data);
                socket.emit('join_room', {
                    success: true,
                    room: data,
                });
                io.to(data).emit('quant_players', io.sockets.adapter.rooms.get(data).size);
            } else {
                socket.emit('join_room', {
                    success: false,
                    error: 'Sala cheia',
                });
            }
        } else {
            socket.join(data);
            socket.emit('join_room', {
                success: true,
                room: data,
            });
        }
    });
    socket.on('quant_players', (data: string) => {
        socket.emit('quant_players', io.sockets.adapter.rooms.get(data)?.size);
    });
    socket.on('quit_room', (data: string) => {
        socket.leave(data);
        socket.emit('quit_room');
        io.to(data).emit('quant_players', io.sockets.adapter.rooms.get(data)?.size);
    })
}