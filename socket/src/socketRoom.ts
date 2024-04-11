export default function (io: any, socket: any): void {
    socket.on('join_room', (data: string): void => {
        if(!!io.sockets.adapter.rooms.get(data)) {
            if(io.sockets.adapter.rooms.get(data)?.size < 2) {
                socket.join(data);
                socket.emit('join_room_is_success', {
                    success: true,
                    room: data
                });
                socket.type_player = 'monster';
            } else {
                socket.emit('join_room_is_success', {
                    success: false,
                    error: 'sala cheia'
                });
            }
        } else {
            socket.join(data);
            socket.emit('join_room_is_success', {
                success: true,
                room: data
            });
            socket.type_player = 'human';
        }
    });
    socket.on('quit_room', (data: string): void => {
        socket.to(data).emit('player2_quit_room');
        socket.leave(data);
        socket.emit('quit_room');
    });
    socket.on('my_room', (data: string) => {
        io.to(data).emit('your_room', socket.adapter.rooms.get(data)?.size);
        socket.emit('your_type_player', socket.type_player);
    });
}