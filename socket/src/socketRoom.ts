export default function (io: any, socket: any): void {
    socket.on('join_room', (data: string): void => {
        if(!!io.sockets.adapter.rooms.get(data)) {
            if(io.sockets.adapter.rooms.get(data)?.size < 2) {
                socket.join(data);
                socket.emit('join_room_is_success', {
                    success: true,
                    room: data
                });
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
        }
    });
    socket.on('quit_room', (data: string): void => {
        socket.leave(data);
    });
    socket.on('my_room', (data: string) => {
        socket.emit('your_room', socket.adapter.rooms.get(data)?.size);
    });
}