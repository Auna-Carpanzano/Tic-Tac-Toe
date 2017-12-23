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

  function playGame(squareId, player) {
    originalBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(originalBoard, player)
    if (gameWon) gameOver(gameWon)
  }

  function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, []);
  }

}); //End document ready function
