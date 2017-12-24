$(document).ready(function() {
  var player = ""
  var computer = "";
  var cells = document.querySelectorAll('.cell');
  var originalBoard;
  var winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];

  startGame();

  function startGame() {
    document.querySelector(".startGame").style.display = "block";
    $("#turnX").click(function() {
      player = "X";
      computer = "O";
      makeBoard();
    });
    $("#turnO").click(function() {
      player = "O";
      computer = "X";
      makeBoard();
    });
  };

  function makeBoard() {
    $(".startGame").fadeOut(1000);
    originalBoard = Array.from(Array(9).keys());
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
      cells[i].style.removeProperty('background-color');
      cells[i].addEventListener('click', checkTurn, false);
    }
  }

  function checkTurn(square) {
    if (typeof originalBoard[square.target.id] == 'number') {
      playGame(square.target.id, player);
      if (!checkTie()) playGame(bestSpot(), computer);
    }
  }

  function checkTie() {
    if (emptySquares().length === 0) {
      for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "#16a085";
      }
      declareWinner("Tie Game!");
      var x = setTimeout(end, 1000);
      return true;
    }
    return false;
  }

  function playGame(squareId, player) {
    originalBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(originalBoard, player)
    if (gameWon) gameOver(gameWon)
  }

  function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = {
          index: index,
          player: player
        };
        break;
      }
    }
    return gameWon;
  }

  function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
      document.getElementById(index).style.backgroundColor =
        gameWon.player == player ? "#2980b9" : "#c0392b";
    }
    for (var i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click', checkTurn, false);
      declareWinner(gameWon.player == player ? "You win!" : "You lose!");
      var x = setTimeout(end, 1000);
    }
  }

  function end() {
    $(".endGame").css("display", "none");
    $(".startGame").fadeIn(1000);
  }

  function declareWinner(who) {
    document.querySelector(".endGame").style.display = "block";
    document.querySelector(".endGame .text").innerText = who;
  }

  function emptySquares() {
    return originalBoard.filter(s => typeof s == 'number');
  }

  function bestSpot() {
    return miniMax(originalBoard, computer).index;
  }

  function miniMax(newBoard, current) {
    var availSpots = emptySquares(newBoard);
    if (checkWin(newBoard, player)) {
      return {
        score: -10
      };
    }
    else if (checkWin(newBoard, computer)) {
      return {
        score: 10
      };
    }
    else if (availSpots.length === 0) {
      return {
        score: 0
      };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = current;
      if (current == computer) {
        var result = miniMax(newBoard, player);
        move.score = result.score;
      }
      else {
        var result = miniMax(newBoard, computer);
        move.score = result.score;
      }
      newBoard[availSpots[i]] = move.index;
      moves.push(move);
    }
    var bestMove;

  }
}); //End document ready function
