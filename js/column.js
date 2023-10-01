const CHARACTERS = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";

export class Column {
  constructor(x, fontSize, context) {
    this.x = x;
    this.y = 0;
    this.fontSize = fontSize;
    this.context = context;
  }

  drawSymbol() {
    const characterIndex = Math.floor(Math.random() * CHARACTERS.length);
    const symbol = CHARACTERS[characterIndex];

    context.fillText(symbol, this.x, this.y);
    this.y += this.fontSize;
  }
}
