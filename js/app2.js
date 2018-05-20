
// Select Div Container
const divContainer = document.querySelector(".container");

// Select 'Moves' counter
const movesCounter = document.querySelector(".moves");

// An empty list to store clicked cards for match comparison
let cardCompareList = [];

// Different card types
const diamond = "diamond";
const paperPlane = "paper-plane-o";
const anchor = "anchor";
const bolt = "bolt";
const cube = "cube";
const leaf = "leaf";
const bicycle = "bicycle";
const bomb = "bomb";

// An array of all cards types in deck
const cardsInDeck = [diamond, diamond, paperPlane, paperPlane, anchor, anchor, bolt, bolt, cube, cube, leaf, leaf, bicycle, bicycle, bomb, bomb];


const launchGame = () => {

    prepareGame();

}

const prepareGame = () => {
    // Create game table/deck and append to page
    const createCardDeck = document.createElement("ul");
    divContainer.appendChild(createCardDeck).className = "deck";

    // Select game table/deck
    const cardDeck = document.querySelector(".deck");

    // Clear/Reset the current card layout
    cardDeck.innerHTML = "";

    // Create 16 blank cards for game table/deck
    for (let i = 0; i < 16; i++) {
        let blankCard = document.createElement('li');
        cardDeck.appendChild(blankCard).className = "card";
    }

    /*
     * Create icon html element and append the font-awesome icon class format
     * to it without fully completing the class name. The class name will be
     * completed once the cards are shuffled.
     */  
    const blankCards = document.querySelectorAll('.card');
    blankCards.forEach( (card) => {
        let uniqueCard = document.createElement('i');
        card.appendChild(uniqueCard).className = "fa fa-";
    });

    // grab all 'i' elements
    const cardIcons = document.querySelectorAll('.deck i');

    // Shuffle cards
    let shuffleCards = shuffle(cardsInDeck);

    /* 
     * Loop through each card's icon HTML element and add a random card type
     * to the class to complete it's Font-Awesome symbol.
     */
    for (let i = 0; i < cardIcons.length; i++) {
        cardIcons[i].className += shuffleCards[i];
    };
}

// Timer function from https://stackoverflow.com/questions/5517597/
let timerVar = setInterval(countTimer, 1000);
let totalSeconds = 0;
function countTimer() {
   ++totalSeconds;
   const hour = Math.floor(totalSeconds /3600);
   const minute = Math.floor((totalSeconds - hour*3600)/60);
   const seconds = totalSeconds - (hour*3600 + minute*60);

   document.querySelector(".time").innerHTML = seconds;
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Function to alert the user that they've won 
 * the game once all cards have been matched.
 */
const congrats = () => {
    if (document.querySelectorAll('.match').length === 16) {
        clearInterval(timerVar);
        alert(`Congratulations! It took you ${document.querySelector(".time").innerHTML} seconds and ${movesCounter.innerHTML} moves to win!`)
    }
};

// This call the function to start the game
launchGame();