const fs = require('fs');
const path = require('path');
const readline = require('readline');


const folderPath = './data';
const inputFilePath = 'input_1.txt';
const fullPath = folderPath + "/" + inputFilePath;

let numbers = [];

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
        let foundFirstNumber = false;
        
        line.split('').forEach(char => { 
            if (/[a-zA-Z]/.test(char)) {
                //placeholder
            } else if (/\d/.test(char)) {
                foundFirstNumber ? lastNumber = char : firstNumber = char;
                foundFirstNumber = true;
            } else {
                console.log(`${char} is neither a letter nor a number.`);
            }

            if (!lastNumber || lastNumber === '') {
                lastNumber = firstNumber;
            }
    
            currentNumberStr = firstNumber + lastNumber;
        });

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
        console.log(numbers[i]);
        sum += numbers[i];
    }
    console.log('Total sum:', sum);
}

