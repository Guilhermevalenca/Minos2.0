interface IPlayer {
    x: number,
    y: number,
    type: 'human' | 'monster' | undefined
}
interface IStartingPosition {
    top: number,
    left: number
}
export type {
    IPlayer,
    IStartingPosition
}
