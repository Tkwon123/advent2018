const fs = require('fs');
const util = require("util");
const readFile = util.promisify(fs.readFile); // wrap the callback with a promise

let match = false
let history = new Set();
let counter = 0
let acc = 0

readFile('input.txt').then( output =>{
  content = output.toString();
  let formatted = formatRawText(content);
  
  do {
    let cv = formatted[counter%formatted.length]
    acc = acc + cv
    if (history.has(acc)) {
      console.log(`Found match at: ${acc}`)
      match = true
    } else {
      counter = counter + 1
      history.add(acc)
    }
  } while (!match)
  
})

function formatRawText(string){
  let array = string.split(/\s+/); // carraige returns
  let parsedArray = array.map(item =>{
    return parseInt(item)
  })
  return parsedArray
}