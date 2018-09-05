var answer, guess, hint;

const types = ["fire", "grass", "electric", "ground", "water"];
const pokemons = [
  {
    name: "bulbasaur",
    type: "grass",
    weakness: "fire"

  },
  {
    name: "charmander",
    type: "fire",
    weakness: "water"
  },
  {
    name: "squirtle",
    type: "water",
    weakness: "electric"
  },
  {
    name: "pickachu",
    type: "electric",
    weakness: "ground"
  },
  {
    name: "caterpie",
    type: "bug",
    weakness: "grass"
  }
]

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkAnswer(id) {
  let arrow =  document.getElementById("arrow");
  let score = document.getElementById('current-score').textContent.toLowerCase().split(' ');
  guess = document.getElementById('option-' + id + '-name').textContent.toLowerCase();
  if (guess === answer) {
    document.getElementById('option-' + id).setAttribute('src', './answers/checkmark.png');
    scoreChange = Number(score[0]);
    document.getElementById('current-score').innerHTML = (scoreChange + 1) + ' out of 5 correct';
  } else {
    document.getElementById('option-' + id).setAttribute('src', './answers/X.png');
  }
  arrow.style.visibility = "visible";
  arrow.addEventListener('click', function () {
    setOptions(numbers);
    setQuestion(newChoices);
  });
}

function setOptions(optionsArray) {
  document.getElementById('arrow').style.visibility = 'hidden';
  Shuffle(optionsArray).map((x, index) => { // runs through shuffled array of numbers
    let option = document.getElementById('option-' + x);
    let optionName = document.getElementById('option-' + x + '-name');
    option.setAttribute("src", "./symbols/" + types[index] + ".png"); // sets option
    optionName.innerHTML = types[index].charAt(0).toUpperCase() + types[index].slice(1); // sets option type name
  });
}



function setBoard() {
  numbers.forEach(element => document.getElementById('option-' + element).addEventListener('click', () => {checkAnswer(element);})); // adding listeners to each option
  setOptions(numbers);
  setQuestion(newChoices);                                                                                                                                                                                                     
}

function setQuestion(options) {
  let pokemonPicture = document.getElementById('pokemon-picture');
  let pokemonName = document.getElementById('pokemon-name');
  pokemonPicture.setAttribute("src", "./pokemons/" + pokemons[options[0]].name + ".png"); //sets pokemon picture
  pokemonName.innerHTML = pokemons[options[0]].name.charAt(0).toUpperCase() + pokemons[options[0]].name.slice(1); // sets pokemon name
  answer = pokemons[options[0]].weakness;
  hint = pokemons[options[0]].type;
  document.getElementById('hint-button').addEventListener('click', function() {document.getElementById('hint-type').setAttribute('src', './symbols/' + hint + '.png');}); //add listener to hint 
  options.shift();
}

const pokemonChoices = [0, 1, 2, 3, 4];
const numbers = ["zero", "one", "two", "three", "four"]; 
let newChoices = Shuffle(pokemonChoices.slice());
setBoard();

