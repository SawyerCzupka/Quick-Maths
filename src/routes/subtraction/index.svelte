<script>
    import {question} from "./game.js";
    import {answerClick} from "./game.js";
    import {newQuestion} from "./game.js";

    import Start from '../../components/Start.svelte';

    let questionSvelte = question;
    let start = false;

    function answerClickSvelte(i) {
        answerClick(i)
        questionSvelte = question;
    }

    function newQuestionSvelte() {
        newQuestion()
        questionSvelte = question;
    }

    function startPress() {
        start = true;
    }
</script>

<style>
    .Body {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 10em 300px
    }

    .Game {
        transform: scale(1);
        grid-column: 1 / 4;
        grid-row: 2;

    }

    .Stats {
        grid-column: 1;
        grid-row: 1
    }

    button {
        transform: scale(2);
        background-color: white; /* Green */
        border: 2px solid rgb(255,62,0);
        color: rgb(255,62,0);
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        margin: auto;
        font-size: 16px;
        outline: none;
    }

    .Next-Question {
        transform: scale(1);
        font-size: 150%;
        grid-row: 2;
        grid-column: 2 / 4;
        padding: 20px 100px;
        border: 3px solid rgb(255,62,0);

    }

    button:hover {
        background-color: rgb(255,62,0);
        color: white;
    }

    .buttons {
        justify-content: center;
        display: grid;
        grid-template-columns: 200px 200px 200px 200px;
        grid-template-rows: 1em 1em;
        align-items: center;
        grid-column-gap: 50px;
        grid-row-gap: 120px;
        
    }

    .Question {
        font-size: 5em;
    }

    .StartButton {
        grid-column: 1 / 4;
        grid-row: 2;
    }
</style>

<svelte:head>
    <title>Subtraction</title>
</svelte:head>

<div class='Body'>
    {#if start == false}
    <button on:click={startPress} align='center' class='StartButton'>Start Game</button>

    {:else if start == true}
    <div class='Game'>
        <p class='Question' align='center'>{questionSvelte.question}</p>

        <div class='buttons' align='center'>
            {#each questionSvelte.answerChoices as i}
            <button on:click={() => answerClickSvelte(i)}>{i}</button>
            {/each}

            {#if questionSvelte.response != false}
                <button on:click={newQuestionSvelte} class="Next-Question">
                    Next Question
                </button>
            {/if}
        </div>
    </div>

    <div class="Stats">
    </div>
    {/if}
</div>
