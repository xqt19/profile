
const player1 = document.querySelector("#player1_race");
const player2 = document.querySelector("#player2_race");
let index1 = 0;
let index2 = 0;

document.addEventListener("keyup", (event) => {
  if (event.keyCode === 81) {
    // input.value = " ";
    player1.querySelectorAll("td")[index1].classList.remove('active');
    index1 += 1;
    player1.querySelectorAll("td")[index1].classList.add('active');
  }
  if (event.keyCode === 80) {
    // input.value = "";
    player2.querySelectorAll("td")[index2].classList.remove('active');
    index2 += 1;
    player2.querySelectorAll("td")[index2].classList.add('active');
  }
  if (index1 === 10) {
    alert("The race is over! Player 1 has won!");
    window.location.reload(true);
  }
  if (index2 === 10) {
    alert("The race is over! Player 2 has won!");
    window.location.reload(true);
  }
});
