const { generateSetup } = require('./util/setup.js');

async function main(){
    console.log(await generateSetup(100, 4));
}

main();