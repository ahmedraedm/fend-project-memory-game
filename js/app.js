const li = $('li');
let itemName,itemOne,itemTwo,counter,openedCards,totMatchedCtr,cardsShuffled,checkOpen,stars;
const cardShapes =['fa-diamond' ,'fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-anchor','fa-leaf','fa-bicycle','fa-diamond','fa-bomb','fa-leaf','fa-bomb','fa-bolt','fa-bicycle','fa-paper-plane-o','fa-cube'];

$(document).ready(function() {
  initialize();
});

// Initializing function to remove any list item hasClass('open','show','match'), empty 'openedCards' array, set 'counter' & 'totMatchedCtr' to zero
//openedCards: array contains the class name of any opened card <i>
//counter: Counts number of moves.
//totMatchedCtr: Total Matched Counter, it is incremented by 2 for every 2 cards matched.
//cardShapes: Array contains all cards shapes (classes)
function initialize() {
  $('.open, .show, .match').removeClass('open show match');
  openedCards =[];
  counter=0;
  totMatchedCtr=0;
  stars=3;
  document.getElementById("spanCounter").innerHTML = counter;
  cardsShuffled = shuffle(cardShapes);
  // adding card shape class to each <i> element
  for (var i = 0; i < cardsShuffled.length; i++) {
    $('.deck').children('li').children('i').eq(i).attr('class','fa') // remove any class from the last game except 'fa' class
    $('.deck').children('li').children('i').eq(i).addClass(cardsShuffled[i])
  }
  for (var i = 0; i <=2; i++) {
    $('.stars').children('li').children('i').eq(i).attr('class','fa fa-star') // remove any class from the last game except 'fa' class
  }
  $('.game-end').removeClass('game-end-show');
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
  switch (true) {
    case counter>10 && counter<=14:
      $('.stars').children('li').children('i').eq(1).attr('class','fa') // remove any class from the last game except 'fa' class
      stars =2;
      break;
    case counter>15:
      $('.stars').children('li').children('i').eq(2).attr('class','fa') // remove any class from the last game except 'fa' class
      stars =1;
      break;
    default:
    stars=3;
}}

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

//  Checks if the clicked element (whether it is <li> element or <i> element) already opened before or not.
// checkOpen: Is true when the clicked element already opened before(has a class'open')
function hasClassOpen(evt) {
  // Clicked element may be <i> or <li>
  if (evt.target.localName==="li") {
    checkOpen=$(evt.target).hasClass('open');
  }
  else {
    checkOpen=$(evt.target.parentElement).hasClass('open');
  }
}

function checkIfWin(){
  if (totMatchedCtr===16) { // All cards matched. Win!
    $('.game-end').addClass('game-end-show'); // show the celebrate background
    setTimeout(function(){  // Wait untill the celebration background appears
      let answer =confirm(`Congratulations! You won, your score is: ${counter} and stars: ${stars}
Play again?`);
  if (answer) {
    initialize();
  }
    },500);
  }
}

// Event listener when clicking on a list item
$('li').on('click', function (evt) {
    hasClassOpen(evt); // check if the clicked element is already opened before
    // Prevent to open more than 2 cards, prevent to click on a prematched card, prevent to click on an already opened card
    if((openedCards.length<2) && !$(evt.target).hasClass('match') && !checkOpen){
      showCard(evt);
      addCardToArr(evt);
      //wait untill matched cards counter is incremented
      setTimeout(checkIfWin,900)
    }
})

// Reset game
$('.fa-repeat').on('click', function () {
  initialize();
})
