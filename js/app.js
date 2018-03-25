const li = $('li');
let itemName,itemOne,itemTwo,counter,openedCards,totMatchedCtr;
/*
 * Create a list that holds all of your cards
 */

// Initializing function to remove any list item hasClass('open','show','match'), empty 'openedCards' array, set 'counter' & 'totMatchedCtr' to zero
$(document).ready(function() {
    $('.open, .show, .match').removeClass('open show match');
    openedCards =[];
    counter=0;
    totMatchedCtr=0;
    document.getElementById("spanCounter").innerHTML = counter;
});
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

function addCounter(){
  counter += 1;
  document.getElementById("spanCounter").innerHTML = counter;
  debugger;
}

function showCard(e){
  $(e.target).addClass('open');
  $(e.target).addClass('show');
}

function match(){
  $('.open').addClass('match');
  $('.open').removeClass('open show');
  totMatchedCtr += 2;
}

function notMatch(e){
  $('.open').removeClass('open show');
};

// This function sets the name of the second class of the first child (item) of the clicked List to variable "itemName", then push it to the array opnedCards
function addCardToArr(e){
  itemName=$(e.target.children[0]).attr('class').split(' ')[1];
  openedCards.push(itemName);
  if (openedCards.length==2) {
    itemOne=openedCards[0];
    itemTwo=openedCards[1];
    if (itemOne===itemTwo) {
        match();
    }
    else{
      // debugger;
      setTimeout(notMatch,700)
    }
    openedCards=[];
    addCounter();
  }
}

// Event listener when clicking on a list item
li.on('click', function (evt) {
    // Checks whether this list item already has a match class or not.
    if (!$(evt.target).hasClass('match')) {
      showCard(evt);
      addCardToArr(evt);
      if (totMatchedCtr===16) {
        alert("You win, your score is: "+ counter);
      }
    }
    // debugger;
})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
