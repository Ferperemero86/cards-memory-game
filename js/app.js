/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
document.addEventListener('DOMContentLoaded', function() {

 const deck = document.querySelector('.deck');
 const cards = document.querySelector('.card');
 let cardsList = ['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor',
                  'fa fa-bolt','fa fa-cube','fa fa-anchor','fa fa-leaf',
                  'fa fa-bicycle','fa fa-diamond','fa fa-bomb','fa fa-leaf',
                  'fa fa-bomb','fa fa-bolt','fa fa-bicycle','fa fa-paper-plane-o',
                  'fa fa-cube'];

 let openCardsList = [];
 let counter = 0;
 console.log(counter);
 let spanCounter = document.getElementsByClassName('moves');
 spanCounter[0].append(counter);

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

 function displayCardSymbol(evt) {
   if((evt.target.nodeName === 'LI') && (evt.target.getAttribute('class') !== 'card open show') && (evt.target.getAttribute('class') !== 'card open show match')) {
        openCards(evt);
    }
 }

 function openCards(evt) {
   evt.target.setAttribute('class','card open show');
   let openCard = evt.target.firstChild.getAttribute('class');
   let cardPositionVal = openCardsList.indexOf(openCard);

    openCardsList.push(openCard);

    countCards();

    if((openCardsList.length >= 2) && (openCardsList.length % 2 === 0)) {
        if(openCardsList[cardPositionVal] === openCardsList[openCardsList.length-2]) {
          setTimeout(function() {
           matchCards(evt);
         },400);

        }  else {
          setTimeout(function() {
           removeCards(evt);
         },400);
        }

       if(openCardsList.length === 16) {
         displayMessage();
       }
    }
 }// END OPENCARDS FUNCTION

function matchCards(evt) {
 var attributes = evt.target.firstChild.getAttribute('class');
 var matchElements = document.getElementsByClassName(attributes);

   for(let i = 0; i < matchElements.length; i++) {
     matchElements[i].parentElement.setAttribute('class','card open show match');
   }
}

function removeCards(evt) {
  let lastElement = evt.target.firstChild.getAttribute('class');
  let matchLastElement = document.getElementsByClassName(lastElement);

  let beforeElement = openCardsList[openCardsList.length -2 ];
  let matchBeforeElement = document.getElementsByClassName(beforeElement);

  for(let i = 0; i < 2 ; i ++ ) {
  matchLastElement[i].parentElement.setAttribute('class','card');
  matchBeforeElement[i].parentElement.setAttribute('class','card');
  }

  openCardsList.splice(-2,2);
 }

  function countCards() {
    spanCounter[0].firstChild.remove();
    spanCounter[0].append(counter += 1);
  }

  function displayMessage() {
    let stars = '';

    if(counter < 25) {
      const star = document.getElementsByClassName('fa fa-star');
      star[0].classList.add('color');
      star[1].classList.add('color');
      star[2].classList.add('color');

      stars = 3;
    }

    if(counter > 24 && counter < 32) {
      const star = document.getElementsByClassName('fa fa-star');
      star[0].classList.add('color');
      star[1].classList.add('color');

      stars = 2;

    }

    if(counter > 31 && counter < 100000) {
      const star = document.getElementsByClassName('fa fa-star');
      star[0].classList.add('color');

      stars = 1;

    }

    const mainContainer  = document.getElementsByClassName('container');
    const divMessage = document.createElement('div');
    const h2Message = document.createElement('h2');
    const pMessage = document.createElement('p');
    const playAgainLink = document.createElement('a');

    divMessage.setAttribute('class','you-win-message');
    mainContainer[0].prepend(divMessage);
    h2Message.textContent = "YOU WIN!";
    const divContainer  = document.getElementsByClassName('you-win-message');
    divContainer[0].prepend(h2Message);

    pMessage.textContent = 'You have scored'+ ' ' + stars +' ' + 'stars with' + ' ' + counter + ' ' + 'moves';
    divContainer[0].append(pMessage);


    playAgainLink.setAttribute('class','play-again-link');
    playAgainLink.setAttribute('href','file:///Users/fernandoperez/Desktop/miprueba/fend-project-memory-game-master/index.html');
    playAgainLink.textContent = 'Play Again';
    divContainer[0].append(playAgainLink);

  }

   document.querySelector('.deck').addEventListener('click', function (evt) {
       displayCardSymbol(evt);

   });

   console.log(shuffle(cardsList));

   const fragment = document.createDocumentFragment();

   for(let i=0; i < cardsList.length; i++) {
      const li = document.createElement('li');
      li.setAttribute('class','card');
      const image = document.createElement('i');
      image.setAttribute('class',cardsList[i]);
      const insertCard = li.append(image);

      fragment.append(li);
   }

   deck.append(fragment);


}); // END LOADING CONTENT
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