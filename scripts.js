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
}); //End document ready function
