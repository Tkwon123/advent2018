const fs = require('fs');
const util = require("util");

const readFile = util.promisify(fs.readFile); // wrap the callback with a promise
let searching = true

readFile('/Users/twon002/Documents/Code/advent2018/d5/data.txt').then(output => {
  const data = output.toString();

  let arr = data.split('')

  while (searching) {
    removeElement(arr)
  }
  const final = arr.join('')
  console.log(`Final string ${final}`)
  console.log(`Final length ${arr.length}`)
})



function removeElement(arr) {
  // if element exists, remove it
  let resultIndex = arr.findIndex(searchRegex)
  // else searching = false
  if (resultIndex >= 0) {
    // remove element
    // console.log(`Removing ${arr[resultIndex]} and ${arr[resultIndex+1]}`)
    arr.splice( resultIndex, 2)
  } else {
    searching = false
  }
}

function searchRegex(el, index, array) {
  if (/[a-z]/.test(el)) { // is a lower case
    try {
      return array[index + 1] == el.toUpperCase() ? true : false // if uppercase
    } catch (err) {
      searching = false
    }
  } else if (/[A-Z]/.test(el)) {
    try {
      return array[index + 1] == el.toLowerCase() ? true : false // if uppercase 
    } catch (err) {
      searching = false
    }
  }
}

function remove(array) {
  array.reduce((acc, cv, index) => {
    console.log(acc)
    let regexpUpper = /[A-Z]/;
    let regexpLower = /[a-z]/;
    let prevLetter = array[index - 1]
    let regex = /([a-z][A-Z]|[A-Z][a-z])/;
  })
  // return remove(reduced)
}