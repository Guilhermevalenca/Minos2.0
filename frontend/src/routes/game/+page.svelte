<script lang="ts">
    import './game.scss';
    import socket, {room} from "$lib/socket";
    import type {IPlayer, IStartingPosition} from "$lib/interfaces";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import swal from "sweetalert2";
    import listSkills from "$lib/game/listSkills";
    import actionsPlayerHuman from "$lib/game/actionsPlayerHuman";
    import actionsPlayerMonster from "$lib/game/actionsPlayerMonster";

    onMount(() => {
        if(!$room) {
            goto('/room');
        }
    })

    function handleKeydown({key}: {key: string}): void {
        let currentPosition: IPlayer= {
            ...player1
        };
        if(key && !!player1) {
            if(key === "ArrowUp" || key === "w") {
                currentPosition.y -= 1;
            } else if(key === "ArrowDown" || key === "s") {
                currentPosition.y += 1;
            } else if(key === "ArrowLeft" || key === "a") {
                currentPosition.x -= 1;
            } else if (key === "ArrowRight" || key === "d") {
                currentPosition.x += 1;
            } else if (listSkills.find(value => key === value)) {
                if(player1.type === 'human') {
                    actionsPlayerHuman(currentPosition, map, key);
                } else if (player1.type === 'monster') {
                    actionsPlayerMonster(currentPosition, map, key);
                }
            }
            try {
                if(!!map && map[currentPosition.y][currentPosition.x] === 0) {
                    player1 = currentPosition;
                }
            } catch (e) {
                //...
            }
        }
    }
    let player1: IPlayer;
    let player2: IPlayer;
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
    $: {
        player1;
        socket.volatile.emit('currentPosition', {
            room: $room,
            current_position: player1
        });
    }
    socket.volatile.on('player2_currentPosition', (data: IPlayer) => {
        player2 = data;
    });

    let quant_players: number = 1;
    socket.emit('quant_players', $room);
    socket.on('quant_players', (data: number) => {
        quant_players = data;
    });
    socket.on('send_your_player', () => {
        socket.emit('send_your_player', {
            player:player1,
            room: $room
        });
    });
    socket.on('player2', (data: IPlayer) => {
        player2 = data;
    });
    function setTypePlayer(data: 'human' | 'monster') {
        if(data === 'human') {
            player1 = {
                x: 0,
                y: 0,
                type: "human"
            }
        } else if (data === 'monster'){
            player1 = {
                x: 10,
                y: 10,
                type: "monster"
            }
        }
        if(player1) {
            socket.emit('player_data', {
                room: $room,
                player: player1
            });
        }
    }
    function quitGame() {
        socket.emit('quit_room', $room);
    }
    socket.on('quit_room', () => {
        room.set(undefined);
        goto('/room');
    });
    let map: (number | undefined)[][] | undefined;
    let startedGame: boolean = false;
    socket.on('started_game', (data: {startedGame: boolean, map: (number| undefined)[][] | undefined}) => {
        startedGame = data.startedGame;
        map = data.map;
    });
    function started() {
        socket.emit('started_game', $room);
    }
    $: {
        if(!!player1 && !!player2) {
            if(player1.x === player2.x && player1.y === player2.y) {
                socket.emit('end_game_by_collision', $room);
            }
        }
    }
    socket.on('end_game_by_collision', () => {
        let messageTitle: string = `Fim de jogo, ${player1.type === 'human' ? 'você perdeu!!' : 'você ganhou!!!'}`
        swal.fire({
            title: `Fim de jogo,${messageTitle}`,
            text: `${player1.type === 'human' ? 'Mais sorte na proxima' : 'Continue assim!!!'}`
        })
            .finally(() => {
                quitGame();
            })
    })
</script>
<svelte:window on:keydown={handleKeydown} />
<button on:click={quitGame}>Sair do jogo</button>

<h1>Nome da sala: {$room}</h1>

<fieldset style="width: 400px">
    <legend>Escolha seu personagem</legend>
    {#if (!!player1 && !!player1.type)}
        <div>
            <ul>
                <div>
                    <strong>Personagem escolhido: </strong>
                    <span>{player1.type === 'human' ? 'Humano' : 'Monstro'}</span>
                </div>
            </ul>
            {#if (player2 && !!player2.type)}
                <ul>
                    <div>
                        <strong>Personagem do segundo player:</strong>
                        <span>{player2.type === 'human' ? 'Humano' : 'Monstro'}</span>
                    </div>
                </ul>
            {/if}
        </div>
    {/if}
    <div>
        <ul>
            <button on:click={() => setTypePlayer('human')}>Humano</button>
            <button on:click={() => setTypePlayer('monster')}>Monstro</button>
        </ul>
        {#if (!!player1 && !!player2)}
            {#if player1.type === player2.type}
                <ul>
                    <em>Obs.: a partida só poderá começar quando os dois players tiverem personagens diferentes.</em>
                </ul>
            {:else}
                <ul>
                    <button on:click={started}>start game</button>
                </ul>
            {/if}
        {/if}
    </div>
</fieldset>


<p>{quant_players < 2 ? 'Esperando o segundo player se conectar' : ''}</p>
{#if (quant_players === 2) && (startedGame && !!map)}
    <div class="{player1.type}"
         style="top: {player1.y * 32 + startedPosition.top}px; left: {player1.x * 32 + startedPosition.left}px"
    />
    <div class="{player2.type}"
         style="top: {player2.y * 32 + startedPosition.top}px; left: {player2.x * 32 + startedPosition.left}px"
    />
    <table>
        {#each map as value, row}
            <tr>
                {#each value as element, column}
                    {#if (row === 0 && column === 0)}
                        <td class="chao" id="firstElement" bind:this={firstElement} />
                    {:else if (element === 0)}
                        <td class="chao" />
                    {:else if (element === 1)}
                        <td class="parede" />
                    {/if}
                {/each}
            </tr>
        {/each}
    </table>
{/if}
