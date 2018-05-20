
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

    // Create 16 blank cards for game table/deck
    for (let i = 0; i < 16; i++) {
        let blankCard = document.createElement('li');
        cardDeck.appendChild(blankCard).className = "card";
    }

    // Create icon html element and append to font-awesome icon class to it
    const blankCards = document.querySelectorAll('.card');
    blankCards.forEach( (card) => {
        let uniqueCard = document.createElement('i');
        card.appendChild(uniqueCard).className = "fa fa-";
    });
}

launchGame();