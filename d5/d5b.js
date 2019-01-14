const fs = require('fs');
const util = require("util");

const readFile = util.promisify(fs.readFile); // wrap the callback with a promise
let searching = true
let currentMin = {}
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

readFile('/Users/twon002/Documents/Code/advent2018/d5/data.txt').then(output => {
  const data = output.toString();

  const original = data.split('')
  // loop through each letter
  letters.forEach((letter, index) => {
    let arr = original.slice();
    // remove letter elements
    let filtered = arr.filter( char => {
      return char.toLowerCase() === letter ? false : char
    })

    while (searching) {
      removeElement(filtered)
    }
    let length = filtered.length
    let total = {
      length,
      index
    }
    
    if (currentMin.length){
      if (total.length < currentMin.length) {
        currentMin = total
      }   
    } else {
      currentMin = total
    }
    searching = true
    console.log(`completed ${letter}`)
  })
  console.log(`Final: ${JSON.stringify(letters[currentMin.index])} with ${currentMin.length}`)
})

function removeElement(arr) {
  // if element exists, remove it
  let resultIndex = arr.findIndex(searchRegex)
  // else searching = false
  if (resultIndex >= 0) {
    // remove element
    // console.log(`Removing ${arr[resultIndex]} and ${arr[resultIndex+1]}`)
    arr.splice(resultIndex, 2)
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