let game = {
    'min':1, 
    'max':10
};

document.addEventListener('DOMContentLoaded', function() {
    game.output = document.querySelector('.output');
    game.message = document.querySelector('.message');
    game.guessInput = document.querySelector('input');
    game.btn = document.querySelector('button');
    game.btn.addEventListener('click', guessValue);
    init();
})

function init() {
    game.guesses = 0;
    game.num = ranNumber(game.min, game.max);
    let tempMsg = `Guess a number from ${game.min} to ${game.max}`;
    message(tempMsg, 'blue');
}

function guessValue() {
    if (game.btn.classList.contains('replay')) {
        init();
        game.btn.innerHTML = 'Guess';
        game.guessInput.style.display = 'block';
        game.btn.classList.remove('replay');
    } else {
        game.guesses += 1;
        let tempGuess = game.guessInput.value;
        game.guessInput.value = '';
        game.guessInput.select();
        tempGuess = parseInt(tempGuess);
        
        if (isNaN(tempGuess)) {
            message('Please enter only Digits', 'red');
        } else if (tempGuess === game.num) {
            message(`Correct guess of ${game.num} in ${game.guesses} guesses`, 'green');
            gameOver();
        } else {
            let holder = tempGuess > game.num ? {
                'clr':'blue',
                'msg':'Was lower'
            } : {
                'clr':'purple',
                'msg':'Was higher'
            }
            message(holder.msg, holder.clr);
        }
    }
}

function ranNumber(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min);
}

function message(msg, clr) {
    game.message.innerHTML = msg;
    game.message.style.color = clr || 'black';
    game.guessInput.style.borderColor = clr || 'black';
    game.btn.style.backgroundColor = clr || 'black';
    game.btn.style.color = 'white';
}

function gameOver() {
    game.btn.innerHTML = 'Restart Game';
    game.guessInput.style.display = 'none';
    game.btn.classList.add('replay');
    game.max += 5;
}