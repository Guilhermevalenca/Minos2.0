import type {IPlayer} from "$lib/interfaces";

export default function (position: IPlayer, map: (number | undefined)[][] | undefined, key: string): IPlayer | void {
    if(map !== undefined) {
        if(key === ' ') {
            alert('human');
        }
    }
}