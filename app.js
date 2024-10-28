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

// Function to draw shapes based on the selected tool
canvas.addEventListener('mouseup', (e) => {
    if (!drawing) return;
    const tool = document.querySelector('input[name="tool"]:checked').value;
    
    ctx.strokeStyle = document.getElementById('color-picker').value;
    ctx.lineWidth = 2;

    switch (tool) {
        case 'line':
            drawLine(startX, startY, e.offsetX, e.offsetY);
            break;
        case 'rectangle':
            drawRect(startX, startY, e.offsetX, e.offsetY);
            break;
        case 'circle':
            drawCircle(startX, startY, e.offsetX, e.offsetY);
            break;
    }
    ctx.beginPath(); // Reset the path
});

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawRect(x1, y1, x2, y2) {
    ctx.beginPath();
    const width = x2 - x1;
    const height = y2 - y1;
    ctx.rect(x1, y1, width, height);
    ctx.stroke();
}

function drawCircle(x1, y1, x2, y2) {
    ctx.beginPath();
    const radius = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    ctx.arc(x1, y1, radius, 0, Math.PI * 2);
    ctx.stroke();
}

