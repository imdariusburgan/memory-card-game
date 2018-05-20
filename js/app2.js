
// Select Div Container
const divContainer = document.querySelector(".container");

// Select 'Moves' counter
const movesCounter = document.querySelector(".moves");

// An empty list to store clicked cards for match comparison
let cardCompareList = [];

const launchGame = () => {

    prepareGame();

}

const prepareGame = () => {
    // Create game table/deck
    const createCardDeck = document.createElement("ul");
    divContainer.appendChild(createCardDeck).className = "deck";

    // Select game table/deck
    const cardDeck = document.querySelector(".deck");

    // Clear/Reset the current card layout
    cardDeck.innerHTML = "";
}

launchGame();