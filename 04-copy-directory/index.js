const fs = require('fs');
const path = require('path');
const fsp = fs.promises;

const dataFolder = path.resolve(__dirname, 'files');
const copyFolder = path.resolve(__dirname, 'files(copy)');

fs.mkdir(copyFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(copyFolder, (err, files) => {
  if (err) {
    throw err;
  } else {
    files.forEach((file) => {
      const pathToCopyFile = path.resolve(copyFolder, file);
      fsp.unlink(pathToCopyFile);
    });
  }
});

fs.readdir(dataFolder, (err, files) => {
  if (err) {
    throw err;
  } else {
    files.forEach((file) => {
      const pathToFile = path.resolve(dataFolder, file);
      const pathToCopyFile = path.resolve(copyFolder, file);
      fsp.copyFile(pathToFile, pathToCopyFile);
    });
  }
});

console.log('Копирование файлов успешно завершено!');
