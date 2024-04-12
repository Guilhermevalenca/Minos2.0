<script lang="ts">
    import swal from 'sweetalert2';
    import socket from "$lib/socket";
    import {goto} from "$app/navigation";
    import type {IRoomSocket} from "$lib/interfaces";
    import {room} from '$lib/socket';
    import {onMount} from "svelte";
    let newRoom: string = '';
    function submit(event: SubmitEvent) {
        event.preventDefault();
        socket.emit('join_room', newRoom);
    }
    socket.on('join_room', (data: IRoomSocket) => {
        if(data.success) {
            room.set(data.room);
            goto('/game');
        } else {
            swal.fire({
                title: 'Algo deu errado!',
                text: data.error
            });
        }
    })
</script>

<form on:submit={submit}>
    <input type="text" on:input={event => {newRoom = event.target.value}} />
    <button type="submit">let's go</button>
</form>