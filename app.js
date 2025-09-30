
const puzzleContainer = document.getElementById("puzzle-container");
const pieces = Array.from(document.querySelectorAll(".piece"));
const shuffleBtn = document.getElementById("shuffle-btn");
const message = document.getElementById("message");

let firstPiece = null;
let secondPiece = null;


let images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg"
];


function shuffle() {
  images.sort(() => Math.random() - 0.5);
  renderPuzzle();
  message.textContent = "Puzzle shuffled!";
}

function renderPuzzle() {
  pieces.forEach((piece, index) => {
    piece.style.backgroundImage = `url(${images[index]})`;
    piece.setAttribute("data-current", index);
  });
}


function handleClick(e) {
  const clicked = e.target;

  if (!firstPiece) {
    firstPiece = clicked;
    firstPiece.classList.add("selected");
  } else if (!secondPiece && clicked !== firstPiece) {
    secondPiece = clicked;
    swapPieces();
  }
}


function swapPieces() {
  let firstIndex = pieces.indexOf(firstPiece);
  let secondIndex = pieces.indexOf(secondPiece);

  [images[firstIndex], images[secondIndex]] = [images[secondIndex], images[firstIndex]];

  renderPuzzle();

  firstPiece.classList.remove("selected");
  secondPiece.classList.remove("selected");
  firstPiece = null;
  secondPiece = null;

  checkWin();
}

function checkWin() {
  let solved = true;
  for (let i = 0; i < images.length; i++) {
    if (images[i] !== `images/${i + 1}.jpg`) {
      solved = false;
      break;
    }
  }

  if (solved) {
    message.textContent = "🎉 Congratulations! Puzzle Solved!";
  }
}


pieces.forEach(piece => piece.addEventListener("click", handleClick));
shuffleBtn.addEventListener("click", shuffle);


renderPuzzle();

