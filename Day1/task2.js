const fs = require('fs');
const path = require('path');
const readline = require('readline');

const folderPath = './data';
const inputFilePath = 'input_1.txt';
const fullPath = folderPath + "/" + inputFilePath;

let numbers = [];

const textNumbers = {
    "one" : 1,
    "two" : 2,
    "three" : 3,
    "four" : 4,
    "five" : 5,
    "six" : 6,
    "seven" : 7,
    "eight" : 8,
    "nine" : 9,
    "zero" : 0
};


if (fs.statSync(fullPath).isFile()) {
    const fileStream = fs.createReadStream(fullPath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lineNumber = 0;
    rl.on('line', (line) => {
        lineNumber++;
        let currentNumberStr = '';

        let firstNumber = '';
        let lastNumber = '';

        let firstPosition, lastPosition;
        let firstSymbolNumber, lastSymbolNumber, firstSymbolPosition, lastSymbolPosition;
        let foundFirstNumber = false;

        let trueFirstNumber;
        let trueLastNumber;

        firstSymbolNumber = 9; lastSymbolNumber = 1;
        firstSymbolPosition = 0; lastSymbolPosition = 40;
        
        line.split('').forEach((char, index) => {
            if (/[a-zA-Z]/.test(char)) {
                // [firstSymbolNumber, firstSymbolPosition] = findNumber(0);
                // [lastSymbolNumber, lastSymbolPosition] = findNumber(1);

            } else if (/\d/.test(char)) {
                if (!foundFirstNumber) {
                    firstNumber = char;
                    firstPosition = index;
                    foundFirstNumber = true;
                } 
                lastNumber = char;
                lastPosition = index;  
            } else {
                console.log(`${char} is neither a letter nor a number.`);
            }
        });

        if (!lastNumber || lastNumber === '') {
            lastNumber = firstNumber;
        }

        firstNumber = parseInt(firstNumber, 10);
        lastNumber = parseInt(lastNumber, 10);

        trueFirstNumber = (firstPosition <= firstSymbolPosition) ? firstNumber : firstSymbolNumber;
        trueLastNumber = (lastPosition >= lastSymbolPosition) ? lastNumber : lastSymbolNumber;

        console.log(trueFirstNumber, "aaaaaaaaaaaaaaaaa" , trueLastNumber);
        currentNumberStr = trueFirstNumber + trueLastNumber;

        if (currentNumberStr) {
            numbers.push(parseInt(currentNumberStr, 10));
        }
    });
    
    rl.on('close', () => {
        calculateSum(numbers);
        console.log('Finished reading the file.');
        // console.log('Numbers:', numbers);
    });

}

function calculateSum(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        // console.log(numbers[i]);
        sum += numbers[i];
    }
    console.log('Total sum:', sum);
}

function findNumber(firstOrLast) {
    if (firstOrLast === 0) {

    } else if (firstOrLast === 1) {

    }
}
