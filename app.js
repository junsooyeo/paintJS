const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

let painting = false;
let filling = true;
const CANVAS_SIZE = 700;
const DEFAULT_COLOR = "#2C2C2C";
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown() {
  painting = true;
}

function notDrawing() {
  painting = false;
}

function pickColor(event) {
  ctx.strokeStyle = event.target.style.backgroundColor;
  ctx.fillStyle = event.target.style.backgroundColor;
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function setSize(event) {
  ctx.lineWidth = event.target.value;
}

function changeMode(event) {
  if (filling) {
    mode.innerText = "Paint";
    filling = false;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  } else {
    mode.innerText = "Fill";
    filling = true;
  }
}
function dontShow(event) {
  event.preventDefault();
}
function saveImage(event) {
  const img = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = img;
  link.download = "image";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseleave", notDrawing);
  canvas.addEventListener("mouseup", notDrawing);
  canvas.addEventListener("contextmenu", dontShow);
}

Array.from(color).forEach(color => color.addEventListener("click", pickColor));

if (range) {
  range.addEventListener("input", setSize);
}

if (mode) {
  mode.addEventListener("click", changeMode);
}

if (save) {
  save.addEventListener("click", saveImage);
}
