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

 let sec = 0;
 let min = 0;
 let time;



 let stars = '';

 if(counter < 2) {
   const star = document.getElementsByClassName('fa fa-star');
   star[0].classList.add('color');
   star[1].classList.add('color');
   star[2].classList.add('color');

   stars = 3;
 }

 /**
* @description shuffle function - Represents a shuffle for the cards. We want to reorder the cards.
* @param {object} array - Represents the CardsList array. We need to use it in order to shuffle the cards.
* @param {number} array.length - Returns a number with the array's length.
* @param {string} temporaryValue - Returns the string stored in the array in that position.
* @param {num} randomIndex - Returns a random number.
*/

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

 /**
* @description displayCardSymbol function - When the card is hidden and the user clicks, displays openCards function.
*/

 function displayCardSymbol(evt) {
   if((evt.target.nodeName === 'LI') && (evt.target.getAttribute('class') !== 'card open show') && (evt.target.getAttribute('class') !== 'card open show match')) {
        openCards(evt);
    }
 }

 /**
* @description openCards function - Checks in the openCardsList array if the cards match and if that array is complete with the 16 cards
                                    in order to display the congrats message.
* @param {}  openCard- gets the child element content atribute of the 'Li' clicked in the event.
* @param {}  cardPositionVal - Returns the number position of the element in the openCardsList array
*/

 function openCards(evt) {
   evt.target.setAttribute('class','card open show');
   let openCard = evt.target.firstChild.getAttribute('class');
   let cardPositionVal = openCardsList.indexOf(openCard);

    openCardsList.push(openCard);

    if((openCardsList.length >= 2) && (openCardsList.length % 2 === 0)) {
        countCards();
        if(openCardsList[cardPositionVal] === openCardsList[openCardsList.length-2]) {
          setTimeout(function() {
           matchCards(evt);
         },400);

        }  else {
          setTimeout(function() {
           removeCards(evt);
         },400);
        }

      // if(openCardsList.length === 16) {
         displayMessage();
      // }
    }
 }// END OPENCARDS FUNCTION

 /**
* @description matchCards function - Gets the child atribute content of the 'Li' clicked in the event and sets the new atribute with match class
                                     in order to show the cards.
* @param {}  attributes- Gets the child element content atribute of the 'Li' clicked in the event.
* @param {}  matchElements - Select the elements with the same attribute.
*/

function matchCards(evt) {
 var attributes = evt.target.firstChild.getAttribute('class');
 var matchElements = document.getElementsByClassName(attributes);

   for(let i = 0; i < matchElements.length; i++) {
     matchElements[i].parentElement.setAttribute('class','card open show match');
   }
}

/**
* @description removeCards function - Removes the cards from the openCardsList array and  sets the cards deleted just with the card class in order to hide them.
* @param {}  lastElement- Gets the child element content atribute of the 'Li' clicked in the event.
* @param {}  matchLastElement - Select the elements with the same attribute.
* @param {}  beforeElement  -  Gets the content of the element before the last one in the openCardsList array.
* @param {}  matchBeforeElement - Select the elements with the same attribute.
*/

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

 /**
 * @description countCards function - Keeps a  track of the movements and add styles to the stars depending on the number of movements done.
 * @param {} counter - Keeps storing the number of movemetns done.
 * @param {} stars - sets a value depending on the movements done.
 */

  function countCards() {
    spanCounter[0].firstChild.remove();
    spanCounter[0].append(counter += 1);

    if(counter > 13 ) {
      const star = document.getElementsByClassName('fa fa-star');
      star[0].classList.remove('color');
      stars = 2;

    }

    if(counter > 20) {
      const star = document.getElementsByClassName('fa fa-star');
      star[1].classList.remove('color');

      stars = 1;

    }
  }

  /**
  * @description displayMessage function - Displays a  final message of congrats with your score and the time it takes you to finish the game. Stops the timer too.
                                           Different elements are created and inserted in the div message container.

  */

  function displayMessage() {

    stopTimer();

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

    pMessage.textContent = 'You have scored'+ ' ' + stars +' ' + 'stars with' + ' ' + counter + ' ' + 'moves In' + ' '  + min + ' ' + 'minutes' +  ' ' + sec + ' ' + 'seconds';
    divContainer[0].append(pMessage);



    playAgainLink.setAttribute('class','play-again-link');
    playAgainLink.setAttribute('href','index.html');
    playAgainLink.textContent = 'Play Again';
    divContainer[0].append(playAgainLink);

  } // END OF DISPLAY MESSAGE

  /**
  * @description timer function - Displays the min and seconds you are sepending to win the game.
  * @param {} time - Contains the setInterval function.
  * @param {} sec - contains the seconds updated everytime with the setInterval function.
  * @param {} min - contains the minutes updated everytime with the setInterval function.
  */

  function timer() {

    time = setInterval(function(){
    sec = sec + 1;
    //min = Math.floor(sec/60);
    if(sec === 60) {
      min += 1;
      sec = 0;
    }

    document.getElementsByClassName('sec')[0].append(sec);
    document.getElementsByClassName('sec')[0].firstChild.remove();

    document.getElementsByClassName('min')[0].append(min);
    document.getElementsByClassName('min')[0].firstChild.remove();
    }, 1000);
  }

  /**
  * @description stopTimer function - Clear the variables contained in the setInterval function.

  */

  function stopTimer() {
    clearInterval(time);

}

  document.querySelector('.startButton').addEventListener('click', function (evt) {
      document.querySelector('.startButton').remove();
      timer();
      document.querySelector('.deck').addEventListener('click', function (evt) {
          displayCardSymbol(evt);

      });

  });





   shuffle(cardsList);


   console.log(cardsList);

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
