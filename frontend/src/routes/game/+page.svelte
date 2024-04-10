<script lang="ts">
    import './game.scss';
    import type {IPlayer, IStartingPosition} from "$lib/interfaces";
    export let data;

    function handleKeydown({key}: {key: string}): void {
        if(key) {
            if(key === "ArrowUp" || key === "w") {
                player1.y -= 1;
            } else if(key === "ArrowDown" || key === "s") {
                player1.y += 1;
            } else if(key === "ArrowLeft" || key === "a") {
                player1.x -= 1;
            } else if (key === "ArrowRight" || key === "d") {
                player1.x += 1;
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
</script>
<svelte:window on:keydown={handleKeydown} />

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