
// Select Div Container
const divContainer = document.querySelector(".container");

// Select 'Moves' counter
const movesCounter = document.querySelector(".moves");

// An empty list to store clicked cards for match comparison
let cardCompareList = [];

const blankCards = document.querySelectorAll('.card');


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

    timerFunction();
}

// Function to display a card's symbol
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

// Timer function from https://stackoverflow.com/questions/5517597/
const timerFunction = () => {
    let timerVar = setInterval(countTimer, 1000);
    let totalSeconds = 0;
    function countTimer() {
    ++totalSeconds;
    const hour = Math.floor(totalSeconds /3600);
    const minute = Math.floor((totalSeconds - hour*3600)/60);
    const seconds = totalSeconds - (hour*3600 + minute*60);

    document.querySelector(".time").innerHTML = seconds;
    }
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

   if (parseInt(movesCounter.innerHTML) === 10) {

        starsList.removeChild(starsList.childNodes[0]);

    } else if (parseInt(movesCounter.innerHTML) === 15) {

        starsList.removeChild(starsList.childNodes[0]);

    } else if (parseInt(movesCounter.innerHTML) === 20) {

        starsList.removeChild(starsList.childNodes[0]);

    }
}

// Function to show card symbols when clicked, add them to an array, 
// check to see if they match, and if so lock them. If not, flip them over.
const doCardsMatch = () => {
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
    console.log('doCardsMatch is working');
}

// This call the function to start the game
launchGame();
doCardsMatch();