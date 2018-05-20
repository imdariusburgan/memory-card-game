/*
 * TO DO:
 * - Add game code to single 'launch' function
 * - Add click event on button to resart
 *  + Select restart icon
 *  + Set up click event listener
 *  + Run function to launch game
 * -DONE- Decrease star ratings after X amount of moves
 * -DONE- Create a timer that starts with the game and stops once it's over
 * - Clean up & refactor code
 */

const launchGame = () => {

    // Select Div Container
    const divContainer = document.querySelector(".container");

    // Select 'Moves' counter
    const movesCounter = document.querySelector(".moves");

    // An empty list to store clicked cards for match comparison
    let cardCompareList = [];

    

}

/*
 * Function to increase "moves" counter
 */
const increaseMoves = () => {
    let currentMoves = parseInt(movesCounter.innerHTML);
    let newScore = currentMoves + 1;
    movesCounter.innerHTML = newScore;
}


/*
 * Function to display card's symbol
 */
const showCardSymbol = (card) => {
    card.classList.add("open", "show");
}

/*
 * Function to clicked cards to list of 'open' cards
 */
const addCardToOpenList = (card) => {
    cardCompareList.push(card.firstChild.classList.value);
}

/*
 * Function to lock cards if matched correctly
 */
const correctlyMatched = (clickedCards) => {

    // Locks cards in place
    clickedCards.forEach( (matchingCard) => {
        matchingCard.classList.add("match");
        matchingCard.classList.remove("open", "show");
    });

    // clear array
    cardCompareList = [];
}

/*
 * Function to hide cards if matched incorrectly
 */
const inCorrectlyMatched = (clickedCards) => {

    setTimeout( () => {
        clickedCards.forEach( (symbol) => {
            symbol.classList.remove("open", "show");
        });

        // clear array
        cardCompareList = [];

    }, 200);
}

/*
 * Function to alert the user that they've won the game once all cards have been matched.
 */
const congrats = () => {
    if (document.querySelectorAll('.match').length === 16) {
        clearInterval(timerVar);
        alert(`Congratulations! It took you ${document.querySelector(".time").innerHTML} seconds and ${movesCounter.innerHTML} moves to win!`)
    }
};


// Create game table/deck
const createCardDeck = document.createElement("ul");
divContainer.appendChild(createCardDeck).className = "deck";

// Select game table/deck
const cardDeck = document.querySelector(".deck");

// Clear/Reset the current card layout
cardDeck.innerHTML = "";

// Different card types
const diamond = "diamond";
const paperPlane = "paper-plane-o";
const anchor = "anchor";
const bolt = "bolt";
const cube = "cube";
const leaf = "leaf";
const bicycle = "bicycle";
const bomb = "bomb";
const cardsInDeck = [diamond, diamond, paperPlane, paperPlane, anchor, anchor, bolt, bolt, cube, cube, leaf, leaf, bicycle, bicycle, bomb, bomb];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Create 16 blank cards for game table/deck
for (let i = 0; i < 16; i++) {
    let blankCard = document.createElement('li');
    cardDeck.appendChild(blankCard).className = "card";
}

// Shuffle cards
let shuffleCards = shuffle(cardsInDeck);

// Add card types to blank cards
const blankCards = document.querySelectorAll('.card');
blankCards.forEach( (card) => {
    let uniqueCard = document.createElement('i');
    card.appendChild(uniqueCard).className = "fa fa-";
});

// grab all 'i' elements
const cardIcons = document.querySelectorAll('.deck i');

for (let i = 0; i < cardIcons.length; i++) {
    cardIcons[i].className += shuffleCards[i];
};

/*blankCards.forEach( () => {
    for (let i = 0; i < blankCards.length; i++) {
        let uniqueCard = document.createElement('i'),
        blankCard[i].appendChild(uniqueCard[i]);
    }
});*/

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


const starRating = () => {

    // Select the list that holds the stars
    const starsList = document.querySelector(".stars")

    /*
     * If number of moves equal 10, the player will be bumped down to 2 stars
     * If number of moves equal 15, the player will be bumped down to 1 stars
     * If number of moves equal 20, the player will be bumped down to 0 stars
     */

   if (parseInt(movesCounter.innerHTML) === 10) {

        starsList.removeChild(starsList.childNodes[0]);

    } else if (parseInt(movesCounter.innerHTML) === 15) {

        starsList.removeChild(starsList.childNodes[0]);

    } else if (parseInt(movesCounter.innerHTML) === 20) {

        starsList.removeChild(starsList.childNodes[0]);

    }
}




const doCardsMatch = () => {
    // Function to show card symbols and check to see if they match
    blankCards.forEach( (card) => {
        card.addEventListener("click", (event) => {
            showCardSymbol(card);
            addCardToOpenList(card);

            if (cardCompareList.length == 2) {

                const clickedCards = document.querySelectorAll(".open");

                if (cardCompareList[0] == cardCompareList[1] ) {
                    correctlyMatched(clickedCards);
                } else {
                    inCorrectlyMatched(clickedCards);
                }

                increaseMoves();
            }
            setTimeout ( () => {
                congrats();
            }, 0);

            starRating();
        });
    });
}




const startGame = () => {
    console.log("Game Started");

    /*
     * Declare global variables
     */

}













// Function that allows players to restart the game
const restartGame = () => {

    // Select restart button
    const restartButton = document.querySelector('.restart');
    
    // Add click event to restart button
    restartButton.addEventListener("click", (event) => {
        /*
         *
         * Add function to restart game here
         * 
         */
    });
}