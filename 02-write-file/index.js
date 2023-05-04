const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const output = fs.createWriteStream(path.join(__dirname, 'output.txt'));

stdout.write('Hi! Write your text here:\n');
stdin.on('data', data => {
    data.toString().trim() === 'exit' ?
    exitApp() :
    output.write(data);
});

process.on('SIGINT', () => {
    exitApp();
})

function exitApp() {
    console.log('Bye-bye!');
    exit();
  }