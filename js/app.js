// TO-DO LIST
// 1. Refactor code and make it more organized / readable
// 2. Add CSS animation when cards are clicked, unsuccessfully matched, and successfully matched
// 3. Store game's current state by using local storage
// 4. Add keyboard shortcut to restart game

// Select Div Container
const divContainer = document.querySelector(".container");

// Select 'Moves' counter
const movesCounter = document.querySelector(".moves");

// An empty list to store clicked cards for match comparison
let cardCompareList = [];

// Select restart button
const restartButton = document.querySelector('.restart');

// When user clicks the button to restart the game, the restartGame function will run
restartButton.addEventListener("click", (event) => {
    restartGame();
});

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

// Timer function from https://stackoverflow.com/questions/5517597/
const countTimer = () => {
    ++totalSeconds;
    const hour = Math.floor(totalSeconds /3600);
    const minute = Math.floor((totalSeconds - hour*3600)/60);
    const seconds = totalSeconds - (hour*3600 + minute*60);

    document.querySelector(".time").innerHTML = `${minute} minute(s) ${seconds} second(s)`;
}

// Global variables for starting and stopping the timer
let timerVar = setInterval(countTimer, 1000);
let totalSeconds = 0;

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

// Function that decrease the user's star rating 
// based on how many moves they've completed.
const starRating = () => {

    // Select the list that holds the stars
    const starsList = document.querySelector(".stars")

    /*
     * If number of moves equal 10, the player will be bumped down to 2 stars
     * If number of moves equal 15, the player will be bumped down to 1 stars
     * If number of moves equal 20, the player will be bumped down to 0 stars
     */

   if (movesCounter.textContent == 10) {

        starsList.removeChild(starsList.children[0]);

    } else if (movesCounter.textContent == 15) {

        starsList.removeChild(starsList.children[0]);

    } else if (movesCounter.textContent == 20) {

        starsList.removeChild(starsList.children[0]);

    }
}

const doCardsMatch = () => {
    const blankCards = document.querySelectorAll('.card');
    blankCards.forEach( (card) => {
        card.addEventListener("click", (event) => {
            if (card.classList.contains('show') || card.classList.contains('match') ) {
                null;
            } else {
                showCardSymbol(card);
                addCardToOpenList(card);
            }

            if (cardCompareList.length == 2) {

                const clickedCards = document.querySelectorAll(".open");

                if (cardCompareList[0] == cardCompareList[1] ) {
                    correctlyMatched(clickedCards);
                } else {
                    inCorrectlyMatched(clickedCards);
                }

                increaseMoves();
                starRating();
            }
            setTimeout ( () => {
                congrats();
            }, 0);
        });
    });
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

    // Function to show card symbols when clicked, add them to an array, 
    // check to see if they match, and if so lock them. If not, flip them over.
    doCardsMatch();

}
prepareGame();

const restartGame = () => {

    // Select and remove current deck board
    const cardDeck = document.querySelector('.deck')
    divContainer.removeChild(cardDeck);

    // Stop timer
    clearInterval(timerVar);

    // Reset timer
    document.querySelector(".time").innerHTML = " ";

    // Start new timer
    totalSeconds = 0;
    timerVar = setInterval(countTimer, 1000);

    // Build new board
    prepareGame();

    // Sets moves counter back to 0
    movesCounter.innerHTML = 0;

    // Removes number of stars
    const scorePanel = document.querySelector('.score-panel')
    const stars = document.querySelector('.stars')
    scorePanel.removeChild(stars);

    // Creates stars ul element
    const newStars = document.createElement('ul')
    scorePanel.insertBefore(newStars, document.querySelector('.moves'));
    document.querySelector('.score-panel ul').className = "stars";

    // Creates star icons
    for (let i = 0; i < 3; i++) {
        // Selects stars
        const stars = document.querySelector('.stars');

        // Creates li element
        const newLi = document.createElement('li');

        // Creates i element
        const newI = document.createElement('i');

        // Appends new li element to stars ul element
        stars.appendChild(newLi);

        // Appends a new i element to the newly appended li element
        document.querySelectorAll('.stars li')[i].appendChild(newI);

        // Adds a class to the newly appended i element
        document.querySelectorAll('.stars li i')[i].className = "fa fa-star";
    }
}

// Function to display a card's symbol by adding a class to it
const showCardSymbol = (card) => {
    card.classList.add("open", "show");
}

// Function to move any card that's clicked to a 
// list of open cards in order to compare for matches.
const addCardToOpenList = (card) => {
    cardCompareList.push(card.firstChild.classList.value);
}

// Function to hide cards if they are incorrectly matched
const inCorrectlyMatched = (clickedCards) => {
    setTimeout( () => {
        clickedCards.forEach( (symbol) => {
            // remove the class 'open' and 'show' to flip the card back over.
            symbol.classList.remove("open", "show");
        });

        // clear the array holding the 2 cards being compared
        cardCompareList = [];

    }, 200);
}

// Function to lock cards if they are correctly matched
const correctlyMatched = (clickedCards) => {

    // Add the class 'match' to lock the cards in a position showing their symbols.
    // Remove the class 'open' and 'show' because it's no longer needed.
    clickedCards.forEach( (matchingCard) => {
        matchingCard.classList.add("match");
        matchingCard.classList.remove("open", "show");
    });

    // clear the array holding the 2 cards being compared.
    cardCompareList = [];
}

// Function to increase the moves counter
const increaseMoves = () => {
    let currentMoves = parseInt(movesCounter.innerHTML);
    let newScore = currentMoves + 1;
    movesCounter.innerHTML = newScore;
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


