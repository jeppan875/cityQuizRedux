import Skyline from './Skyline'
import MultiPic from './MultiPic'
const citiesLib = require('./lib/cities')
const skylineLib = require('./lib/skylineLib')
const cities = citiesLib.cities
const levels = require('./lib/levels')

class QuizGame {
  constructor (size, maxPoints, playerCount, multiplayer, questionsArr) {
    if (!multiplayer) {
      this.size = size + size * 0.4
      let citiesCount = size
      this.maxPoints = maxPoints
      console.log('constructtor')
      let cities = this.getCities(citiesCount)
      this.cities = cities
      let skylines = this.getSkyline(size * 0.4)
      this.skylines = skylines
      this.currentCount = 0
      this.questions = this.questions(citiesCount, cities, skylines)
      this.score = 0
      this.answers = []
      this.playerCount = playerCount
    } else {
      this.maxPoints = maxPoints
      this.playerCount = playerCount
      this.size = size
      this.currentCount = 0
      this.answers = []
      this.questions = this.multiplayerJoiner(questionsArr, size)
    }
  }
  multiplayerJoiner (questionsArr, size) {
    let arr = []
    for (let i = 0; i < size; i++) {
      if (questionsArr[i].type === 'question') {
        arr.push(new MultiPic(questionsArr[i].rightAnswer, true, questionsArr[i].alternatives, questionsArr[i].paths))
      }
      if (questionsArr[i].type === 'skyline') {
        arr.push(new Skyline(questionsArr[i].rightAnswer, true, questionsArr[i].alternatives, questionsArr[i].paths))
      }
    }
    return arr
  }
  
  questions (size, cities, skylines) {
    console.log(cities)
    let arr = []
    for (let i = 0; i < size; i++) {
      arr.push(new MultiPic(cities[i]))
    }
    for (let i = 0; i < size * 0.4; i++) {
      arr.push(new Skyline(skylines[i]))
    }
    this.shuffleCities(arr)
    console.log(arr)
    return arr
  }
  
  getCities (nr) {
    let arr
    let europe = Object.keys(cities.europe)
    let northAmerica = Object.keys(cities.north_america)
    let southAmerica = Object.keys(cities.south_america)
    let asia = Object.keys(cities.asia)
    arr = europe.concat(northAmerica, southAmerica, asia)
    this.shuffleCities(arr)
    return arr.slice(0, nr)
  }
  
  getSkyline (nr) {
    let skylines = Object.keys(skylineLib.skylineLib)
    this.shuffleCities(skylines)
    return skylines.slice(0, nr)
  }

  shuffleCities (array) {
    if (!Array.isArray(array)) {
      throw new TypeError('The passed argument is not an array.')
    }
    let m = array.length
    let t
    let i
    while (m) {
      i = Math.floor(Math.random() * m--)
      t = array[m]
      array[m] = array[i]
      array[i] = t
    }
    return array
  }
}
export default QuizGame
  