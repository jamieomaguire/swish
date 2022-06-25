const fs = require('fs')
const path = require('path')

const parseTokens = (tokens, label) => {
  const arr = []
  let name = '';

  if (!tokens) {
    return;
  }

  if (typeof tokens === 'object') {
    const nodes = Object.keys(tokens)
    nodes.forEach(n => {
      
      name = label 
      ? `${label}-${n}` 
      : n;

      if (typeof tokens[n] === 'string' || typeof tokens[n] === "number") {
        arr.push(`$${name}: ${tokens[n]};`);
      }

      if (typeof tokens[n] === 'object') {
        arr.push(parseTokens(tokens[n], name))
      }
    });
  }

  return arr.flat();
}

const writeToFile = (scssVariables) => {
  const scssString = scssVariables.join('\n');
  fs.writeFileSync('tokens.scss', scssString);
}

const buildTokens = () => {
  const content = fs.readFileSync('./src/tokens.json')
  const tokens = JSON.parse(content);
  const scssVariables = parseTokens(tokens);
  writeToFile(scssVariables);
}



const generateScssFile = () => {
  buildTokens();
}


generateScssFile();
