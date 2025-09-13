// Your code here.
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Click and Drag</title>
  <link rel="stylesheet" href="style.css">
  <style>
    html {
      box-sizing: border-box;
      background: url('https://source.unsplash.com/NFs6dRTBgaM/2000x2000') fixed;
      background-size: cover;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: sans-serif;
      font-size: 20px;
      margin: 0;
    }
    .items {
      height: 800px;
      width: 80%;
      border: 2px solid white;
      position: relative;
      background: rgba(255,255,255,0.1);
      font-size: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 10px;
    }
    .item {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: bold;
      color: rgba(0,0,0,0.7);
      background: dodgerblue;
      position: absolute; /* Important for free positioning */
      cursor: grab;
      border-radius: 8px;
      user-select: none;
    }
    .item:active {
      cursor: grabbing;
    }
  </style>
</head>
<body>
  <div class="items" id="container">
    <div class="item">01</div>
    <div class="item">02</div>
    <div class="item">03</div>
    <div class="item">04</div>
    <div class="item">05</div>
    <div class="item">06</div>
    <div class="item">07</div>
    <div class="item">08</div>
    <div class="item">09</div>
  </div>

<script>
const container = document.getElementById("container");
const cubes = document.querySelectorAll(".item");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// place cubes in grid initially
function initGrid() {
  let cols = 5;
  let size = 100;
  let gap = 10;
  cubes.forEach((cube, index) => {
    let row = Math.floor(index / cols);
    let col = index % cols;
    cube.style.left = col * (size + gap) + "px";
    cube.style.top = row * (size + gap) + "px";
  });
}
initGrid();

cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.zIndex = 1000; // bring on top
  });
});

document.addEventListener("mousemove", (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // boundaries
  if (newLeft < 0) newLeft = 0;
  if (newTop < 0) newTop = 0;
  if (newLeft + cubeRect.width > containerRect.width) {
    newLeft = containerRect.width - cubeRect.width;
  }
  if (newTop + cubeRect.height > containerRect.height) {
    newTop = containerRect.height - cubeRect.height;
  }

  activeCube.style.left = newLeft + "px";
  activeCube.style.top = newTop + "px";
});

document.addEventListener("mouseup", () => {
  if (activeCube) {
    activeCube.style.zIndex = 1;
  }
  activeCube = null;
});