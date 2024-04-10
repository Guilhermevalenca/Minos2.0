import {io} from 'socket.io-client';
import {env} from "$lib";
import {type Writable, writable} from "svelte/store";

const socket = io(env.VITE_SOCKET_URL);
socket.emit('connection');

export default socket;

const room: Writable<string | undefined> = writable();

export {
    room
}
