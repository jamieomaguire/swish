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
  console.log(scssVariables);
  const scssString = scssVariables.join('\n');
  console.log(scssString)
  fs.writeFileSync('tokens.scss', scssString);
}

const buildTokens = () => {
  const content = fs.readFileSync('./src/tokens.json')
  const tokens = JSON.parse(content);
  const scssVariables = parseTokens(tokens);
  writeToFile(scssVariables);
  // await fs.readFile('./src/tokens.json', async data => {
  //   console.log('in bt')
  //   const tokens = JSON.parse(data);
  //   const scssVariables = parseTokens(tokens);
  //   await writeToFile(scssVariables);
  // });
  
  // console.log(scssVariables)
  // return scssVariables;
}



const generateScssFile = () => {
  console.log('hi')
  buildTokens();
}


generateScssFile();
// const tokens = {
//   "spacing": {
//     "base": 8,
//     "100": 8,
//     "200": 16,
//     "300": 24,
//     "400": 32,
//     "special": {
//       "a": "1",
//       "b": "2",
//       "c": "3"
//     }
//   },
//   "colors": {
//     "blue-10": "#123456",
//     "blue-20": "#223456",
//     "blue-30": "#323456",
//     "blue-40": "#423456",
//     "blue-50": "#523456"
//   }
// }

// const parseTokens = (tokens, label) => {
//   const arr = []
//   let name = '';

//   if (!tokens) {
//     return;
//   }

//   if (typeof tokens === 'object') {
//     const nodes = Object.keys(tokens)
//     nodes.forEach(n => {
      
//       name = label 
//       ? `${label}-${n}` 
//       : n;

//       if (typeof tokens[n] === 'string' || typeof tokens[n] === "number") {
//         console.log(`${name}: ${tokens[n]};`);
//         arr.push(`${name}: ${tokens[n]};`);
//       }

//       if (typeof tokens[n] === 'object') {
//         arr.push(parseTokens(tokens[n], name))
//       }
//     });
//   }

//   return arr.flat();
// }

// const scssVariables = parseTokens(tokens)

