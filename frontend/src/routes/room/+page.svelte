<script lang="ts">
    import swal from 'sweetalert2';
    import socket from "$lib/socket";
    import {goto} from "$app/navigation";
    import type {IRoomSocket} from "$lib/interfaces";
    import {room} from '$lib/socket';
    let newRoom: string = '';
    function submit(event: SubmitEvent) {
        event.preventDefault();
        console.log(newRoom);
        socket.emit('join_room', newRoom);
    }
    socket.on('join_room_is_success', (data: IRoomSocket) => {
        if(data.success) {
            goto('/game');
            room.set(data.room);
        } else {
            swal.fire({
                title: 'Error',
                text: data.error
            })
        }
    });
</script>

<form on:submit={submit}>
    <input on:input={event => {newRoom = event.target.value}} />
    <button type="submit">lest go</button>
</form>