const li = $('li');
let itemName,itemOne,itemTwo,counter,openedCards,totMatchedCtr,cardsShuffled,checkOpen;
const cardShapes =['fa-diamond' ,'fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-anchor','fa-leaf','fa-bicycle','fa-diamond','fa-bomb','fa-leaf','fa-bomb','fa-bolt','fa-bicycle','fa-paper-plane-o','fa-cube'];

// Initializing function to remove any list item hasClass('open','show','match'), empty 'openedCards' array, set 'counter' & 'totMatchedCtr' to zero
$(document).ready(function() {
  initialize();
});

function initialize() {
  $('.open, .show, .match').removeClass('open show match');
  openedCards =[];
  counter=0;
  totMatchedCtr=0;
  document.getElementById("spanCounter").innerHTML = counter;
  cardsShuffled = shuffle(cardShapes);
  // adding card shape class to each <i> element
  for (var i = 0; i < cardsShuffled.length; i++) {
    $('.deck').children('li').children('i').eq(i).addClass(cardsShuffled[i])
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

function addCounter(){
  counter += 1;
  document.getElementById("spanCounter").innerHTML = counter;
  // debugger;
}

function showCard(e){
  $(e.target).addClass('open show');
}

function match(){
  $('.open').addClass('match');
  $('.open').removeClass('open show animated-match enlarge');
  totMatchedCtr += 2;
  openedCards=[];
}

function notMatch(e){
  $('.open').removeClass('open show animated-n-match wobble');
  openedCards=[];
};

// This function sets the name of the second class of the first child (item) of the clicked List to variable "itemName", then push it to the array opnedCards
function addCardToArr(e){
  debugger;
  if (e.target.localName==="li") {
    itemName=$(e.target.children[0]).attr('class').split(' ')[1];
  }
  else {
    itemName=$(e.target).attr('class').split(' ')[1];
  }
  openedCards.push(itemName);
  if (openedCards.length==2) {
    itemOne=openedCards[0];
    itemTwo=openedCards[1];
    if (itemOne===itemTwo) {
      if (openedCards.length===2) {
        $('.open').addClass('animated-match enlarge');
      }
      setTimeout(match,900)
        // match();
    }
    else{
      if (openedCards.length===2) {
        $('.open').addClass('animated-n-match wobble');
      }
      setTimeout(notMatch,900)
    }
    addCounter();
  }
}

//  Checks if the clicked element (whether it is <li> element or <i> element) already opened before or not(whether has class "open")
function hasClassOpen(evt) {
  if (evt.target.localName==="li") {
    checkOpen=$(evt.target).hasClass('open');
  }
  else {
    checkOpen=$(evt.target.parentElement).hasClass('open');
  }
}

// Event listener when clicking on a list item
$('li').on('click', function (evt) {
    hasClassOpen(evt);
    // Prevent to open more than 2 cards and wait for preset timer
    if((openedCards.length<2) && !$(evt.target).hasClass('match') && !checkOpen){

    // Checks whether this list item already has a match class or not.
      showCard(evt);
      addCardToArr(evt);
      //wait untill totMatchedCtr is incremented
      setTimeout(function(){
        if (totMatchedCtr===16) {
          alert("You win, your score is: "+ counter);
        }
      },900)
  }
})

// Reset game
$('.fa-repeat').on('click', function () {
  initialize();
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
