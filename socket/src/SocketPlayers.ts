import IPlayer from "./interfaces/IPlayer";
import map1 from "./maps/map1";

export default function (io: any, socket: any): void {
    socket.on('player_data', (data: { room: number, player: IPlayer } ) => {
        socket.data_player = data.player;
        io.to(data.room).emit('send_your_player');
    });
    socket.on('send_your_player', (data: {room: string, player: IPlayer}) => {
        socket.to(data.room).emit('player2', data.player);
    });
    socket.on('started_game', (data: string) => {
        io.to(data).emit('started_game', {
            startedGame: true,
            map: map1
        });
    });
    socket.volatile.on('currentPosition', (data: { room: string, current_position: IPlayer }): void => {
        socket.to(data.room).volatile.emit('player2_currentPosition', data.current_position);
    });
}