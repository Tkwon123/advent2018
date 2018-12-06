const fs = require('fs');
const util = require("util");

const readFile = util.promisify(fs.readFile); // wrap the callback with a promise
let content = "";

readFile('../data.txt').then( output =>{
  content = output.toString();
  let formatted = formatRawText(content);
  const size = 1000
  let multiArray = new Array(size).fill([])

  for (i = 0; i < multiArray.length; i++){
    multiArray[i] = new Array(size).fill(0)
  }

  formatted.forEach(item=> {
    let parsed = parseItem(item);
    let {posX, posY} = parsePosition(parsed.position)
    let {dimX, dimY} = parseDimensions(parsed.dimensions)
    for (i = 0; i < dimY; i++ ) {
      for (j = 0; j< dimX; j++) {
        try {
          multiArray[posY + i][posX + j] += 1
        } catch (e){
          console.log(e)
        }
      }
    }
  }) 
  let final = multiArray.reduce((acc,cv)=>{
    let inner = cv.reduce((acc,cv)=> cv > 1 ? acc + 1 : acc, 0)
    return parseInt(acc + inner)
  }, 0)
    console.log(`Your final total is: ${final}`)
})

function parseItem(item){
  let modified = {}
  modified['num'] = item.substr(0, item.indexOf(' ')).replace('#','')
  modified['dimensions'] = item.substr(item.indexOf(':')+2, item.length)
  modified['position'] = item.substr(item.indexOf('@') + 2, item.indexOf(":")- item.indexOf('@') -2)
  return modified
}

function parsePosition(coordinates){
  let values = coordinates.split(',');
  formatted = values.map(x=> parseInt(x))

  return {posX: formatted[0], posY :formatted[1]}
}

function parseDimensions(dimensions){
  let values = dimensions.split('x');
  formatted = values.map(x=> parseInt(x))
  return {dimX: formatted[0], dimY:formatted[1]}
}

function formatRawText(string){
  let array = string.split(/\n/); // carraige returns
  return array
}