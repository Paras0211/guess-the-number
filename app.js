/*
Game Rules:
~Player must guess a number between minimum and maximum
~Player has a certain amount of guesses
~Notify player of remaining guesses
~If player loses then notify the player of correct answer
~Option of playing again
*/

// values to be used in game
let min = 1,
    max = 10,
    correctNum = getRandomNum(min,max),
    guessesLeft = 3;

    
// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'), 
      message = document.querySelector('.message');

// Assigning UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener('mousedown',function(e){
    if(e.target.className==='play-again'){
        window.location.reload();
    }
});

// Event Listener for guessBtn
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // checking if input is valid or not
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }

    //  if guess is correct
    if(guess === correctNum){
        // Game over - won
        gameOver(true,`${guess} is correct, YOU WIN!`);
    }else{
        // if guess is wrong
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game over  - lost
            gameOver(false,`Game Over, YOU LOST!. The correct number was ${correctNum}`);
            
        }
        else{
             // Change Border Color
             guessInput.style.borderColor = 'red';

            //  clear input
            guessInput.value ='';
            // if guessesLeft are not equal to zero
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left!`,'red');

        }
    }
});

// Game Over Function
function gameOver(won,msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Change message color
    message.style.color = color;
    // set message
    setMessage(msg);

    // Play Again
    guessBtn.value = 'Play Again?';
    guessBtn.className +='play-again';
}

// Get Winnig Number
function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// setMessage function
function setMessage(msg,color){
    message.textContent = msg;
    message.style.color = color;
}