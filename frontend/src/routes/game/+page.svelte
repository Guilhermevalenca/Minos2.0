<script lang="ts">
    import './game.scss';
    import socket, {room} from "$lib/socket";
    import type {IPlayer, IStartingPosition} from "$lib/interfaces";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    export let data;

    onMount(() => {
        if(!$room) {
            goto('/room');
        }
    })

    function handleKeydown({key}: {key: string}): void {
        let currentPosition: IPlayer = {
            ...player1
        };
        if(key) {
            if(key === "ArrowUp" || key === "w") {
                currentPosition.y -= 1;
            } else if(key === "ArrowDown" || key === "s") {
                currentPosition.y += 1;
            } else if(key === "ArrowLeft" || key === "a") {
                currentPosition.x -= 1;
            } else if (key === "ArrowRight" || key === "d") {
                currentPosition.x += 1;
            }
            try {
                if(data.map1[currentPosition.y][currentPosition.x] === 0) {
                    player1 = currentPosition;
                }
            } catch (e) {
                //...
            }
        }
    }

    let player1: IPlayer = {
        x: 0,
        y: 0
    }
    let startedPosition: IStartingPosition = {
        top: 0,
        left: 0
    }
    let firstElement: HTMLElement | undefined;
    $: {
        firstElement;
        setTimeout(() => {
            if(firstElement) {
                startedPosition.top = firstElement.getBoundingClientRect().top + 4;
                startedPosition.left = firstElement.getBoundingClientRect().left + 5;
            }
        },1);
    }
    socket.emit('my_room', $room);
    socket.on('your_room', (data: any) => {
        console.log(data);
    })
</script>
<svelte:window on:keydown={handleKeydown} />
<h1>sua sala: {$room}</h1>
<div class="person"
     style="top: {player1.y * 32 + startedPosition.top}px; left: {player1.x * 32 + startedPosition.left}px"
/>
<table>
    {#each data.map1 as value, row}
        <tr>
            {#each value as element, column}
                {#if (row === 0 && column === 0)}
                    <td class="chao" id="firstElement" bind:this={firstElement}></td>
                {:else}
                    <td class="chao"></td>
                {/if}
            {/each}
        </tr>
    {/each}
</table>