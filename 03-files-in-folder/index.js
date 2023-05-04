const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const directory = path.resolve(__dirname, 'secret-folder');

fsp.readdir(directory, { withFileTypes: true }).then((files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.resolve(__dirname, 'secret-folder', file.name);
      fsp.stat(filePath).then((stat) => {
        const fileName = path.basename(filePath).split('.')[0];
        const fileExtention = path.extname(filePath).slice(1);
        const fileSize = Math.round(stat.size / 1024 * 1000) / 1000;
        
        console.log(`${fileName} - ${fileExtention} - ${fileSize}kb`);
      });
    }
  });
});
