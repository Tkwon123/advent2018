const fs = require('fs');

const util = require("util");
const readFile = util.promisify(fs.readFile); // wrap the callback with a promise
let content = "";
let final = {
  a: 0, // two
  b: 0 // three
}
readFile('../data.txt')
  .then( output =>{
    content = output.toString();
    let formatted = formatRawText(content);
    let aggregatedArray = formatted.map(string=>{
      let values = {}
      let tempArr = string.split('')
      tempArr.forEach( value =>{
        if (value in values) {
          values[value] = values[value] + 1
        } else {
          values[value] = 1
        }
      })
      return values
    })

    aggregatedArray.forEach( item => {
      if (Object.values(item).some( x => x === 2)) { final.a = final.a + 1 }
      if (Object.values(item).some( x => x === 3)) { final.b = final.b + 1 }
    })
    
    console.log(`The checksum is: ${final.a} * ${final.b} or ${final.a * final.b}`)
})  

function formatRawText(string){
  let array = string.split('\n'); // carraige returns
  return array
}

