const textColorPicker = document.getElementById("textColorPicker");
const canvasColorPicker = document.getElementById("backgroundColorPicker");
const fontSizePicker = document.getElementById("fontSize");

const canvas = document.getElementById("signatureCanvas");
const container = document.querySelector(".container");

const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");

const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to set canvas size based on container's width
function setCanvasSize() {
  const containerWidth = container.offsetWidth;
  canvas.width = containerWidth - 40; // Subtract padding
  canvas.height = canvas.width * (2 / 3); // Maintain aspect ratio (you can adjust this as needed)
}

// Call the function to set canvas size initially and on window resize
setCanvasSize();
window.addEventListener("resize", setCanvasSize);

textColorPicker.addEventListener("change", (event) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
});

canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});

canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    lastX = event.offsetX;
    lastY = event.offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvasColorPicker.addEventListener("change", (event) => {
  ctx.fillStyle = event.target.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

fontSizePicker.addEventListener("change", (event) => {
  ctx.lineWidth = event.target.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener("click", () => {
  localStorage.setItem("canvasContents", canvas.toDataURL());

  let link = document.createElement("a");
  link.download = "my-canvas.png";
  link.href = canvas.toDataURL();
  link.click();
});

retrieveButton.addEventListener("click", () => {
  let savedCanvas = localStorage.getItem("canvasContents");

  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }
});
