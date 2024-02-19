const startButton = document.querySelector(".main-container button");
const heading = document.querySelector(".main-container h1");
const container = document.querySelector(".container");

let shuffledImageNames = [];
let clickedImgNames = [];
let clickedImgAlts = [];
let altArray = [];
let count = 0;
let timeInterval;

function createBox(row, cell) {
  const container = document.getElementById("container");

  for (let i = 0; i < row; i++) {
    const row = document.createElement("div");
    row.classList.add("row", `row-${i + 1}`);

    for (let j = 0; j < cell; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", `cell-${j + 1}`);
      row.appendChild(cell);
    }

    container.appendChild(row);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const imageNames = [
  "alien.png",
  "alien-copy.png",
  "bird.png",
  "bird-copy.png",
  "cactus.png",
  "cactus-copy.png",
  "car.png",
  "car-copy.png",
  "cup.png",
  "cup-copy.png",
  "eye.png",
  "eye-copy.png",
  "star.png",
  "star-copy.png",
  "cube.png",
  "cube-copy.png",
];

function setImages() {
  container.innerHTML = "";
  createBox(4, 4);
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    const imageName = shuffledImageNames[index];
    const imagePath = `img/${imageName}`;
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = imageName;
    img.classList.add("unmatched");
    cell.appendChild(img);
    img.style.display = "none";
    cell.addEventListener("click", () => handleCellClick(img));
  });
}

function handleCellClick(img) {
  if ((img.style.display = "none")) {
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }
  const altPng = img.getAttribute("alt");
  clickedImgNames.push(altPng);
  if (clickedImgNames[0] != clickedImgNames[1]) {
    const alt = altPng.replace(/(-copy)?\.png$/, "");
    clickedImgAlts.push(alt);
  } else {
    clickedImgNames.length = 0;
    clickedImgAlts.length = 0;
    img.style.display = "none";
  }
  if (clickedImgAlts.length === 2) {
    checkForMatch(clickedImgAlts[0], clickedImgAlts[1]);
    setTimeout(() => {
      clickedImgNames.length = 0;
      clickedImgAlts.length = 0;
    }, 400);
  }
}

function checkForMatch(firstCell, secondCell) {
  if (firstCell === secondCell) {
    const firstCellWithSrc = document.querySelector(
      `img[src="img/${firstCell}.png"]`
    );
    const secondCellWithSrc = document.querySelector(
      `img[src="img/${secondCell}-copy.png"]`
    );
    setTimeout(() => {
      firstCellWithSrc.classList.replace("unmatched", "matched");
      secondCellWithSrc.classList.replace("unmatched", "matched");
      const matchedImgs = document.querySelectorAll("img.matched");
      matchedImgs.forEach((matchedImg) => {
        matchedImg.src = "other-img/match.png";
      });
    }, 200);
  } else {
    setTimeout(() => {
      const unMatchedImgs = document.querySelectorAll("img.unmatched");
      unMatchedImgs.forEach((img) => (img.style.display = "none"));
    }, 400);
  }
}

function checkForReset() {
  const matchedImages = document.querySelectorAll(".matched");
  matchedImages.forEach((image) => {
    if (!altArray.includes(image.getAttribute("alt"))) {
      altArray.push(image.getAttribute("alt"));
    }
  });
  if (altArray.length === shuffledImageNames.length) {
    reload();
    clearInterval(timeInterval);
  }
}

startButton.addEventListener("click", () => {
  count++;
  heading.innerHTML = "Level " + count;
  container.style.display = "block";
  shuffledImageNames = shuffleArray(imageNames);
  setImages();
  timeInterval = setInterval(checkForReset, 1000);
});

function reload() {
  startButton.innerText = "Next";
  container.style.display = "none";
  altArray = [];
}
