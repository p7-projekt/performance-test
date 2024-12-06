const { generateSetup } = require('./util/setup.js');

async function main(){
    console.log(await generateSetup(10, 1));
}

main();