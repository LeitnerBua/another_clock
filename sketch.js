let margin = 40;
let firstBlock, secondBlock, thirdBlock, fourthBlock;

function setup() {
    createCanvas(800, 600);

    firstBlock = createDigitBlock(50, height / 2, 0, 15);
    secondBlock = createDigitBlock(200, height / 2, 15, 30);
    thirdBlock = createDigitBlock(350, height / 2, 30, 45);
    fourthBlock = createDigitBlock(500, height / 2, 45, 60);

}

function draw() {
    background(0);


    for(i = 0; i < 15; i++) {
        firstBlock[i].show();
        secondBlock[i].show();
        thirdBlock[i].show();
        fourthBlock[i].show();

        firstBlock[i].color = 50;
        secondBlock[i].color = 50;
        thirdBlock[i].color = 50;
        fourthBlock[i].color = 50;
    }

    pattern();
    highlightSeconds();
    
}

function highlightSeconds() {

    let seconds = second();
    let orange = color(255, 51, 0);

    if(seconds < 15)
        firstBlock[seconds].color = orange;
    else if(seconds < 30)
        secondBlock[seconds-15].color = orange;
    else if(seconds < 45)
        thirdBlock[seconds-30].color = orange;
    else if(seconds < 60)
        fourthBlock[seconds-45].color = orange;
}

function createDigitBlock(x, y, start, end) {
    let digits = [];
    for(let i = start; i < end; i++) {
        let number = ("0" + i).slice(-2);
        if(i % 5 != 0) {
            y += margin;
            digits.push(new Digits(number, x, y));
        } else {
            y = height / 2;
            x += margin;
            digits.push(new Digits(number, x, y));
        }
    }

    return digits;
}

function pattern() {

    let minutes = minute().toString().split("").map(Number);
    if(minutes.length < 2)
        minutes.unshift(0);

    let hours = hour().toString().split("").map(Number);
    if(hours.length < 2)
        hours.unshift(0);

    let digitPatterns = [];

    let currentTime = [];
    let blocks = [firstBlock, secondBlock, thirdBlock, fourthBlock];

    const zero = [0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14];
    const one = [0, 4, 5, 6, 7, 8, 9, 14];
    const two = [0, 5, 10, 11, 12, 7, 2, 3, 4, 9, 14];
    const three = [0, 5, 10, 11, 12, 7, 2, 13, 14, 9, 4];
    const four = [0, 1, 2, 7, 12, 11, 10, 13, 14];
    const five = [10, 5, 0, 1, 2, 7, 12, 13, 14, 9, 4];
    const six = [10, 5, 0, 1, 2, 7, 12, 3, 4, 9, 13, 14];
    const seven = [0, 5, 10, 11, 12, 13, 14];
    const eight = [0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 7];
    const nine = [0, 5, 10, 11, 12, 13, 14, 9, 4, 1, 2, 7];

    digitPatterns.push(zero, one, two, three, four, five, six, seven, eight, nine);

    currentTime[2] = digitPatterns[minutes[0]];
    currentTime[3] = digitPatterns[minutes[1]];
    currentTime[0] = digitPatterns[hours[0]];
    currentTime[1] = digitPatterns[hours[1]];

    for(let i = 0; i < currentTime.length; i++) {
        showTime(currentTime[i], blocks[i]);
    }

}

function showTime(digitArray, block) {
    for(let i = 0; i < block.length; i++) {
        if(digitArray.indexOf(i) != -1)
            block[i].color = 255;
        else
            block[i].color = 50;
    }
}