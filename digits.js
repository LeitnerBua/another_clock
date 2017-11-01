class Digits {
    constructor(digit, x, y) {
        this.digit = digit;
        this.pos = createVector(x, y);
        this.width = textWidth(this.digit);
        this.height = 32;

        this.color = 50;

    }

    show() {
        // stroke(this.color);
        noStroke();
        fill(this.color);
        textSize(this.height);
        text(this.digit, this.pos.x, this.pos.y);
        
        this.width = textWidth(this.digit);
    }
}