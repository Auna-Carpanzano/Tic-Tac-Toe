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

  function startGame() {
    //Allow to show on replay
    document.querySelector(".startGame").style.display = "block";
    //Assign X or O when player chooses
    $("#turnX").click(function() {
      player = "X";
      computer = "O";
      $(".startGame").fadeOut(1000);
      //Make array of 0-8
      originalBoard = Array.from(Array(9).keys());
      for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', checkTurn, false);
      }
    }); //End turnX click function
    $("#turnO").click(function() {
      player = "O";
      computer = "X";
      $(".startGame").fadeOut(1000);
      //makes array of 0-8
      originalBoard = Array.from(Array(9).keys());
      for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
      }
    }); //End turnX click function

  };
}); //End document ready function
