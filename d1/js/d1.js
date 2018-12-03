const fs = require('fs');

const util = require("util");
const readFile = util.promisify(fs.readFile); // wrap the callback with a promise
let content = "";

readFile('../input.txt').then( output =>{
  content = output.toString();
  let formatted = formatRawText(content);
  let total = formatted.reduce((acc, cv)=>{
    let subtotal = acc + cv
    return subtotal
  })
  console.log(`The total is: ${total}`);
})

function formatRawText(string){
  let array = string.split(/\s+/); // carraige returns
  let parsedArray = array.map(item =>{
    return parseInt(item)
  })
  return parsedArray
}