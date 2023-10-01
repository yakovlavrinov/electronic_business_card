class Column {
  constructor(x, fontSize, canvasHeight, context) {
    this.x = x;
    this.y = 0;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
    this.context = context;
  }

  drawSymbol() {
    if (this.y === 0 && Math.random() < 0.98) {
      return;
    }
    const CHARACTERS = "A BC DE FG HI JK LM NO PQ RS TU VW XY Z";
    const characterIndex = Math.floor(Math.random() * CHARACTERS.length);
    const symbol = CHARACTERS[characterIndex];

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

const FONT_SIZE = 16;
const GREEN = "#00d743";
const columns = [];
const columnsCount = canvas.width / FONT_SIZE;

for (let i = 0; i < columnsCount; i++) {
  columns.push(new Column(i * FONT_SIZE, FONT_SIZE, canvas.height, context));
}

context.font = `bold ${FONT_SIZE}px monospace`;

const column = new Column(100, FONT_SIZE, canvas.height, context);

function animate() {
  context.fillStyle = "rgba(0, 0, 0, 0.05)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = GREEN;
  columns.forEach((column) => column.drawSymbol());

  setTimeout(() => requestAnimationFrame(animate), 50);
}

animate();
