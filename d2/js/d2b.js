const fs = require('fs');

const util = require("util");
const readFile = util.promisify(fs.readFile); // wrap the callback with a promise
let content = "";

readFile('../data.txt')
  .then( output =>{
    content = output.toString();
    let arr = formatRawText(content);
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const charsI = [...arr[i]]
        const charsJ = [...arr[j]]
        let diff = charsI.reduce((a, c, i) => {
          return a + (c === charsJ[i] ? 0 : 1)
        }, 0)
        if (diff === 1) {
          
          let ans = [] 
          charsI.forEach((ch, i)=>{
            if (ch == charsJ[i]) {
              ans.push(ch)
            }
          })
          console.log(`The shared values: ${ans.join('')}`)
        }
      }
    }
  })

function formatRawText(string){
  let array = string.split('\n'); // carraige returns
  return array
}

