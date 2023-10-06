const FONT_SIZE = 16;
const GREEN = "#00d743";
const SYMBOLS = "A BC DE FG HI JK LM NO PQ RS TU VW XY Z";
const SYMBOL_DROP_PROBABILITY = 0.98;

class Column {
  constructor(x, fontSize, canvasHeight, context) {
    this.x = x;
    this.y = 0;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
    this.context = context;
  }

  drawSymbol() {
    if (this.y === 0 && Math.random() < SYMBOL_DROP_PROBABILITY) {
      return;
    }

    const symbolIndex = Math.floor(Math.random() * SYMBOLS.length);
    const symbol = SYMBOLS[symbolIndex];

    this.context.fillText(symbol, this.x, this.y);

    if (this.y > this.canvasHeight) {
      this.y = 0;
    } else {
      this.y += this.fontSize;
    }
  }
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const columns = [];
const columnsCount = canvas.width / FONT_SIZE;

for (let i = 0; i < columnsCount; i++) {
  columns.push(new Column(i * FONT_SIZE, FONT_SIZE, canvas.height, context));
}

function animate() {
  context.fillStyle = "rgba(0, 0, 0, 0.05)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = GREEN;
  context.font = `bold ${FONT_SIZE}px monospace`;
  columns.forEach((column) => column.drawSymbol());

  setTimeout(() => requestAnimationFrame(animate), 50);
}

function resetCanvas() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  columns.length = 0;
  const columnsCount = canvas.width / FONT_SIZE;
  for (let i = 0; i < columnsCount; i++) {
    columns.push(new Column(i * FONT_SIZE, FONT_SIZE, canvas.height, context));
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", resetCanvas);

animate();
