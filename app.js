const { generateSetup } = require('./util/setup.js');
const fs = require('fs');

async function main() {
const data = JSON.stringify(await generateSetup(10,1));

fs.writeFile('users.json', data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data has been written to the file successfully!');
    }
  });
}
main();