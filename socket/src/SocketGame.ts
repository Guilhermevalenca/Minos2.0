export default function (io: any, socket: any) {
    socket.on('end_game_by_collision', (data: string) => {
        io.to(data).emit('end_game_by_collision');
    })
}