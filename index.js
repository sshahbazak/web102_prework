/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (var i in games){
        // console.log(games[i].name.toLowerCase());
        let gameName = games[i].name.toLowerCase();
        gameName = gameName.replace("-", ":");
        gameName = gameName.replace("|", ":");

        gameName = gameName.toLowerCase().split(":")[0];
        gameName = gameName.trim()
        gameName = gameName.replaceAll(" ", "_");

        if (gameName === "a_wayfarer's_tale"){
            gameName = "wayfarers_tale";
        } else if (gameName === "how_to_read_minds_2_kit"){
            gameName = "how_to_read_minds_2";
        }

        // console.log(gameName);
        const newDiv = document.createElement("div");
        newDiv.classList.add("game-card");
        const content = `
        <h2> Game Name - ${games[i].name}</h2>
        <p> Description - ${games[i].description}</p>
        <img src = "./assets/${gameName}.png" class = "game-img">
        `

        newDiv.innerHTML = content;

        const currentDiv = document.getElementById("games-container");
        currentDiv.appendChild(newDiv);
    }


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContribution = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
  }, 0);

  console.log(totalContribution);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContribution.toLocaleString('en-US');


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
  }, 0);


// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce( (acc, game) => {
    return acc + 1;
  }, 0);

  gamesCard.innerHTML = `${totalGames.toLocaleString('en-US')}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfunded = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
      });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFunded = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal;
      });


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFunded);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfunded = GAMES_JSON.reduce( (acc, game) => {
    return (game.pledged < game.goal) ? acc + 1: acc;
  }, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${unfunded} ${(unfunded>1)? "games": "game"} remain unfunded. We need your help to fund these amazing games!`; 
// displayStr.innerHTML = "<p>"+displayStr+"</p>";


// create a new DOM element containing the template string and append it to the description container
const newDiv = document.getElementById("description-container");
var z = document.createElement('p'); // is a node
z.innerHTML = displayStr;
newDiv.appendChild(z);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...others] = sortedGames;
console.log(first, second);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstgameDiv = document.getElementById("first-game");
var z = document.createElement('p'); // is a node
z.innerHTML = first.name;
firstgameDiv.appendChild(z);


// do the same for the runner up item
const secondgameDiv = document.getElementById("second-game");
var z = document.createElement('p'); // is a node
z.innerHTML = second.name;
secondgameDiv.appendChild(z);


// Implementing search 

var handleSearch = function(event) {
    event.preventDefault();
    const mySearch = document.getElementById("search");
    var searchedItem = mySearch.value;
    searchedItem = searchedItem.toLowerCase();
    var gameName = [];
    var gameN;
    var flag = 0;
    for (var i in GAMES_JSON){
        gameName.push(GAMES_JSON[i].name.toLowerCase());
        gameName[i] = gameName[i].replace("-", ":");
        gameName[i] = gameName[i].replace("|", ":");

        gameName[i] = gameName[i].toLowerCase().split(":")[0];
        gameName[i] = gameName[i].trim();
        if (gameName[i] === searchedItem){
            deleteChildElements(gamesContainer);
            const newDiv = document.createElement("div");
        newDiv.classList.add("game-card");
        const content = `
        <h2> Game Name - ${gameName[i]}</h2>
        <p> Description - ${GAMES_JSON[i].description}</p>
        <img src = "./assets/${gameName[i].replaceAll(" ", "_")}.png" class = "game-img">
        `

        newDiv.innerHTML = content;

        const currentDiv = document.getElementById("games-container");
        currentDiv.appendChild(newDiv);
        }
    }
    
    // addGamesToPage(flag);
    // console.log(flag);
    // console.log(result);

    




    }
document.addEventListener('submit',handleSearch);