interface IPlayer {
    x: number,
    y: number,
    type: 'human' | 'monster' | undefined
}
interface IStartingPosition {
    top: number,
    left: number
}
interface IRoomSocket {
    success: boolean,
    error: string | undefined,
    room: string | undefined
}

export type {
    IPlayer,
    IStartingPosition,
    IRoomSocket
}
