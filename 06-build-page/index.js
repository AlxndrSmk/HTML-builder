const fs = require('fs');
const path = require('path');
const fsp = fs.promises;

function createProjectDist() {
  const projectDist = path.resolve(__dirname, 'project-dist/assets');
  return fsp.mkdir(projectDist, { recursive: true });
}

async function createHTML() {
  const pathToTemplate = path.resolve(__dirname, 'template.html');
  const template = fs.createReadStream(pathToTemplate, 'utf-8');
  const pathToHTML = path.resolve(__dirname, 'project-dist', 'index.html');

  let templateText = '';
  for await (const chunk of template) {
    templateText += chunk;
  }

  const pathToComponents = path.resolve(__dirname, 'components');
  const components = await fsp.readdir(pathToComponents, {
    withFileTypes: true,
  });

  for (const component of components) {
    const pathToComponent = path.resolve(
      __dirname,
      'components',
      component.name
    );
    const componentExtention = path.extname(pathToComponent);
    const componentName = path.basename(pathToComponent, componentExtention);

    const componentContent = fs.createReadStream(pathToComponent);
    let componentText = '';
    for await (const chunk of componentContent) {
      componentText += chunk;
    }
    templateText = templateText.replace(`{{${componentName}}}`, componentText);
  }

  const indexHtmlContent = fs.createWriteStream(pathToHTML);
  indexHtmlContent.write(templateText);
}

async function createCSS() {
  const pathToInput = path.resolve(__dirname, 'styles');
  const pathToOutput = path.resolve(__dirname, 'project-dist', 'style.css');

  const output = fs.createWriteStream(pathToOutput);

  const styles = await fsp.readdir(pathToInput, { withFileTypes: true });

  for (const style of styles) {
    if (style.isFile()) {
      const filePath = path.resolve(__dirname, 'styles', style.name);
      const fileExtention = path.extname(filePath);
      if (fileExtention === '.css') {
        const input = fs.createReadStream(filePath, 'utf-8');
        let styleText = '';
        for await (const chunk of input) {
          styleText += chunk;
        }
        output.write(styleText + '\n');
      }
    }
  }
}

async function createProject() {
  await createProjectDist();
  await createHTML();
  await createCSS();
}

createProject().catch((err) => console.error(err));
