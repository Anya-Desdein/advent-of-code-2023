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
        
        [firstSymbolNumber, firstSymbolPosition, lastSymbolNumber, lastSymbolPosition] = findNumber(line);

        line.split('').forEach((char, index) => {
            if (/[a-zA-Z]/.test(char)) {
                //placeholder
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
        // console.log("1st: ", firstNumber, " Last: ", lastNumber);
        // console.log("1st txt: ", firstSymbolNumber, " Last txt: ", lastSymbolNumber);
        
        if (firstSymbolNumber === null || firstSymbolPosition === -1 || lastSymbolNumber === null || lastSymbolPosition === -1) {
            trueFirstNumber = firstNumber;
            trueLastNumber = trueLastNumber;
            console.log(typeof trueFirstNumber, "aaa", typeof trueLastNumber);
        } else {
            trueFirstNumber = (firstPosition <= firstSymbolPosition) ? firstNumber : firstSymbolNumber;
            trueLastNumber = (lastPosition >= lastSymbolPosition) ? lastNumber : lastSymbolNumber;
            console.log(typeof trueFirstNumber, "bbb", typeof trueLastNumber);
        }
       
        // console.log(trueFirstNumber, "aaaaaaaaaaaaaaaaa" , trueLastNumber);
        currentNumberStr = concatenateNumbers(trueFirstNumber, trueLastNumber);

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

function findNumber(line) {
    let firstSymbolNumber = null, firstSymbolPosition = -1;
    let lastSymbolNumber = null, lastSymbolPosition = -1;

    for (const [key, value] of Object.entries(textNumbers)) {
        let dynamicRegex = new RegExp(key, 'g');
        
        let match;
        while ((match = dynamicRegex.exec(line)) !== null) {
            let startPosition = match.index;
            let endPosition = startPosition + key.length - 1;

            if (firstSymbolNumber === null) {
                firstSymbolNumber = value; 
                firstSymbolPosition = startPosition;
                // console.log(value, "   index of:", firstSymbolPosition);
            }

            if (endPosition > lastSymbolPosition) {
                lastSymbolNumber = value;
                lastSymbolPosition = endPosition;
                // console.log(value, "   index of:", lastSymbolPosition);
            }
        }
    }

    return [firstSymbolNumber, firstSymbolPosition, lastSymbolNumber, lastSymbolPosition];
}

function concatenateNumbers(num1, num2) {
    return num1 * 10 + num2;
}