var warframeCharacters = ["ASH", "BANSHEE", "TRINITY", "CHROMA", "NYX", "EXCALIBUR", "ZEPHYR", "EMBER", "BARUK", "VALKYR"];
var totalGuesses = 9;       // number of tries
var userGuesses = [];       // letters guessed
var computerPick;           // array number the computer choose randomly
var wordGuessed = [];       // This will be the word we actually build to match the current word
var guessesLeft = 0;        // How many tries the player has left
var finishedGame = false;   // Flag for 'press any key to try again'     
var wins = 0;               //wins
var losses = 0;             //losses

// key entered sound
// var correctSound = new Audio('./assest/sounds/electric-typewriter-daniel_simon.wav');
var correctSound = new Audio('./assest/sounds/clap.wav');
var guessedSound = new Audio('./assest/sounds/boom.wav');
var wrongSound = new Audio('./assest/sounds/tink.wav');

// start the game
function startGame() {
    guessesLeft = totalGuesses;

    //grab a random number from the warframeCharacters array  (word count)
    computerPick = Math.floor(Math.random() * (warframeCharacters.length));

    if(warframeCharacters[computerPick] == warframeCharacters[0]) {
        $('.clue').html("<img src='assest/images/2b61537e5bcc959f807bee7567d9331b.png' width='300'/>");
    }else if(warframeCharacters[computerPick] == warframeCharacters[1]) {
        $('.clue').html("<img src='assest/images/5fdc6663493e0cd95ba77ecb072619cb.png' width='300'/>");
    }else if(warframeCharacters[computerPick] == warframeCharacters[2]) {
        $('.clue').html("<img src='assest/images/23d90b59a57620893a1a4d44434985d8.png' width='300'/>");
    }else if(warframeCharacters[computerPick] == warframeCharacters[3]) {
        $('.clue').html("<img src='assest/images/072f0361d6a83d1475aa63c97e64e473.png' width='300'/>");
    }else if(warframeCharacters[computerPick] == warframeCharacters[4]) {
        $('.clue').html("<img src='assest/images/0122a9753fd85b241f96c697af617b6e.png' width='300'/>");  
    }else if(warframeCharacters[computerPick] == warframeCharacters[5]) {
        $('.clue').html("<img src='assest/images/1543660214882.png' width='300'/>");  
    }else if(warframeCharacters[computerPick] == warframeCharacters[6]) {
        $('.clue').html("<img src='assest/images/d018e1bd88ba57a595cb4f6d8e26c4fa.png' width='300'/>");  
    }else if(warframeCharacters[computerPick] == warframeCharacters[7]) {
        $('.clue').html("<img src='assest/images/e4589a3de185bc3bf0121c5e8f88d689.png' width='300'/>");  
    }else if(warframeCharacters[computerPick] == warframeCharacters[8]) {
        $('.clue').html("<img src='assest/images/e6871ac908844955defccc074e94024c.png' width='300'/>");       
    }else if(warframeCharacters[computerPick] == warframeCharacters[9]) {
        $('.clue').html("<img src='assest/images/ValkyrPrimeProfilePicture.png' width='300'/>");                                
    }else($('.clue').text('neither of these')); 

    // Clear out arrays
    userGuesses = [];
    wordGuessed = [];

    //build the word with blanks
    for (var i = 0; i < warframeCharacters[computerPick].length; i++) {
        wordGuessed.push("_");
    }   

    //gamewin, gameover, title 
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    //refresh the screen
    refreshScreen();
};

//  Updates the display on the HTML Page
function refreshScreen() {

    document.getElementById("gameWins").innerText = wins;
    document.getElementById("gameLosses").innerText = losses;

    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }

    //update guesses, word, and letters entered
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("userGuesses").innerText = userGuesses;
};

//compare letters entered to the character you're trying to guess
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < warframeCharacters[computerPick].length; i++) {
        if(warframeCharacters[computerPick][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
        //Wrong guess sound goes here
        wrongSound.currentTime=0;
        wrongSound.play();
    } else {
        for(var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
        correctSound.play();
            correctSound.currentTime=0;
    }
};

//check if all letters have been entered.
function checkWin() {
    if(wordGuessed.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        finishedGame = true;
    }
};

//check if out of guesses
function checkLoss()
{
    if(guessesLeft <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        losses++;
        finishedGame = true;
    }
}

//guessing
function makeGuess(letter) {
    if (guessesLeft > 0) {
        // Make sure this letter wasn't used
        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);

        }
        else{
            guessedSound.play();
            guessedSound.currentTime=0;

        }
    }
};

// Event listener
document.onkeydown = function(event) {
    //if the game is finished, restart it.
    if(finishedGame) {
        startGame();
        finishedGame = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            // correctSound.play();
            // correctSound.currentTime=0;
            makeGuess(event.key.toUpperCase());
            refreshScreen();
            checkWin();
            checkLoss();
        }
    }
};