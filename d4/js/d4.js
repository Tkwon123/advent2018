const fs = require('fs');
const util = require("util");

const readFile = util.promisify(fs.readFile); // wrap the callback with a promise

// [ '[1518-02-18 23:59] Guard #2141 begins shift',
//   '[1518-02-19 00:24] falls asleep',
//   '[1518-02-19 00:58] wakes up',
//   '[1518-02-20 00:01] Guard #2777 begins shift',
//   '[1518-02-20 00:16] falls asleep',
//   '[1518-02-20 00:20] wakes up',
//   '[1518-02-20 00:46] falls asleep',
//   '[1518-02-20 00:53] wakes up',
const sleepTime = {}

let currentGuard = 0

let lastMinute = 0
readFile('../data.txt').then( output=>{
  let array = output.toString().split(/\n/);
  let sorted = sortTimes(array)
  array.forEach( item=>{
    try {
      if (item.includes("#")) {
        // Close the current guard
        // Set the new guard
        setGuard(item);
      } else if (item.includes("falls asleep")) {
        // set the last minute
        setLastMinute( parseMinute(item) )
      } else if (item.includes("wakes up")){
        // calculate time
        updateSleep(item, currentGuard)
      }
    } catch (err){
      console.log(err)
    }
  });

    // console.log(sleepTime)
  results = Object.keys(sleepTime).map(key =>{
    let result = {
      guard : parseInt(key),
      minutes: sleepTime[key].minutes,
      asleep: sleepTime[key].asleep
    }
    return result 
  })

  // find the most time spent sleeping
  var arr = results.map(function ( key ) {return key['asleep'] });
  // find the guard with that time
  let highest = Math.max(...arr);

  let max = 0

  results.filter( (v) =>{
    if (v.asleep === highest) (console.log( v ))
  })



})

function parseDate(item){
  let begin = item.indexOf('[') +1
  let end = item.indexOf(']') 
  return item.substring(begin,end)
}

function parseMinute(item){
  let time = item.substring(item.indexOf(':') -2, item.indexOf(':') + 3)
  return time.substring(0, 2) == 23 ? 0 : time.substring(3, 5)
}

function updateSleep(item, guard){
  let newMinute = parseMinute(item)
  let asleep = newMinute - lastMinute
  let minutes = tallyMinutes(lastMinute, newMinute)

  // initialize guard if doesnt exist
  if (!sleepTime[guard]) {
    sleepTime[guard] = {
      asleep: 0,
      minutes: {}
    }
  } 
  
  sleepTime[guard]['asleep'] = sleepTime[guard]['asleep'] + asleep || asleep
  
  // zip the existing and incremental minutes together
  Object.keys(minutes).forEach( minute =>{
    sleepTime[guard]['minutes'][minute] = sleepTime[guard]['minutes'][minute] + 1 || 1
  })

  setLastMinute(newMinute)
}

function tallyMinutes(start, end){
  start = parseInt(start)
  let sequence = {}
  let times = end - start
  for (i = 0; i < times; i++){
    sequence[start + i] = 1
  }
  return sequence
}

function setLastMinute(minute){
  lastMinute = minute
}

function setGuard(item){
  let guard = parseGuard(item)
  // if (currentGuard) updateSleep(item, guard) // don't run for the first item in the list
  // console.log(`updated guard ${guard}`)
  currentGuard = guard;
}

function parseGuard(item){
  let begin = item.indexOf("#") + 1
  let end = item.indexOf(" begins")
  return item.substring(begin, end)
}

function sortTimes(unsortedArray){
  return unsortedArray.sort(function(a,b){
    return new Date(parseDate(a)) - new Date(parseDate(b));
})}