var newGameBtn      = document.getElementById('js-newGameButton');
var pickRock        = document.getElementById('js-playerPick_rock');
var pickPaper       = document.getElementById('js-playerPick_paper');
var pickScissors    = document.getElementById('js-playerPick_scissors');

var newGameElem     = document.getElementById('js-newGameElement');
var pickElem        = document.getElementById('js-playerPickElement');
var resultsElem     = document.getElementById('js-resultsTableElement');

var playerPointsElem    = document.getElementById('js-playerPoints');
var playerNameElem      = document.getElementById('js-playerName');
var computerPointsElem  = document.getElementById('js-computerPoints');

var playerPickElem      = document.getElementById('js-playerPick');
var computerPickElem    = document.getElementById('js-computerPick');
var playerResultElem    = document.getElementById('js-playerResult');
var computerResultElem  = document.getElementById('js-computerResult');

// Wartości początkowe gry
var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var winnerIs = '';

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
newGameBtn.addEventListener('click', newGame);

// Funkcja dla zmiennej gameState
function setGameElements(gameState, winnerIs) {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz?';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

function newGame() {
  player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements(gameState);
    playerNameElem.innerHTML = player.name;
    setGamePoints(); 
  }
}


//Wybór gracza
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}


//Przyznawanie punktów
function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ) { 
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana jest Twoja!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrał komputer!";
        computer.score++;
    } else {
		playerResultElem.innerHTML = "Remis!";
		computerResultElem.innerHTML = "Remis!";
	}
    setGamePoints();
    checkGameEnd(player.score, computer.score);
}

//Aktualizacja wyników
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}


//Zakończenie gry
function checkGameEnd() {
    if (player.score == 10) {
        alert('Gratulacje, wygrałeś/-aś rozgrywkę!');
        gameState = 'ended';
    }
    else if (computer.score == 10) {
        alert('Niestety, wygrał komputer');
        gameState = 'ended';
    };
    setGameElements(gameState, winnerIs);
}
setGameElements(gameState, winnerIs);