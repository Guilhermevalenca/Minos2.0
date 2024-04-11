export default function (io: any, socket: any): void {
    socket.volatile.on('currentPosition', (data: any): void => {
        socket.to(data.room).volatile.emit('player2_currentPosition', data.current_position);
    });
}