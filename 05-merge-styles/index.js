const fs = require('fs');
const path = require('path');
const fsp = fs.promises;

const stylesFolder = path.resolve(__dirname, 'styles');
const output = fs.createWriteStream(
  path.resolve(__dirname, 'project-dist', 'bundle.css')
);

fsp.readdir(stylesFolder, { withFileTypes: true }).then((files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.resolve(__dirname, 'styles', file.name);
      const fileExtention = path.extname(filePath);
      if (fileExtention === '.css') {
        const input = fs.createReadStream(filePath, 'utf-8');
        input.on('data', (data) => {
          output.write(data.toString() + '\n');
        });
      }
    }
  });
});
