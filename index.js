const sass = require('sass');
const fs = require('fs')

const result = sass.compile("./integration-test.scss");
console.log(result.css);

fs.writeFile('integration-test-output.css', result.css, err => {
  if (err) {
    console.error(err)
    return
  }
});