app.js

// Canvas and Drawing
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let startX, startY;

// Function to start drawing
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

// Function to stop drawing
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath(); // Reset the path
});

// Function to draw on the canvas
canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!drawing) return; // Stop the function if not drawing
    ctx.lineWidth = 2;
    ctx.strokeStyle = document.getElementById('color-picker').value;
    ctx.lineCap = 'round';

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath(); // Reset the path for the next segment
    ctx.moveTo(e.offsetX, e.offsetY);
}