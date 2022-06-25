const fs = require('fs')
const path = require('path')

/**
 * Traverses a tree of design tokens whilst converting them into string representations of SCSS variables. 
 * @param {object} tokensNode an object containing design tokens
 * @param {string} constructedTokenName the SCSS variable name that gets constructed as each level of the token tree is traversed
 * @returns {string[]} an array of scss variable design tokens
 */
const parseTokens = (tokensNode, constructedTokenName = null) => {
  const scssVariables = []
  let tokenName = '';

  if (!tokensNode) {
    return;
  }

  if (typeof tokensNode === 'object') {
    const nodes = Object.keys(tokensNode)
    nodes.forEach(node => {
      tokenName = constructedTokenName 
      ? `${constructedTokenName}-${node}` 
      : node;

      if (typeof tokensNode[node] === 'string' || typeof tokensNode[node] === "number") {
        scssVariables.push(`$${tokenName}: ${tokensNode[node]};`);
      }

      if (typeof tokensNode[node] === 'object') {
        scssVariables.push(parseTokens(tokensNode[node], tokenName))
      }
    });
  }

  return scssVariables.flat();
}

const writeToFile = (scssVariables) => {
  const scssString = scssVariables.join('\n');
  fs.writeFileSync('./src/scss/tokens.scss', scssString);
}

const buildTokens = () => {
  const content = fs.readFileSync('./src/tokens.json')
  const tokens = JSON.parse(content);
  const scssVariables = parseTokens(tokens);

  return scssVariables;
}

const generateScssFile = () => {
  const scssVariablesString = buildTokens();
  writeToFile(scssVariablesString);
}

generateScssFile();
