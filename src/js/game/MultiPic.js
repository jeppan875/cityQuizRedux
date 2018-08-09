import fire from '../../fire'
import * as QuizActions from '../actions/QuizActions'
const citiesLib = require('./lib/cities')
const helpers = require('./lib/helpers')
const cities = citiesLib.cities
const storage = fire.storage()

class MultiPic {
  constructor (rightAnswer, isMultiplayer, alternativesArr, pathsArr) {
    this.time = 30
    if (!isMultiplayer) {
      this.rightAnswer = rightAnswer
      this.alternatives = this.alternatives(rightAnswer)
      let imgArr = []
      let paths = []
      let urlArr = []
      this.getViews(rightAnswer, imgArr, paths, urlArr)
      this.imgArr = imgArr
      this.paths = paths
      this.urlArr = urlArr
      this.rightAnswer = helpers.replaceAll(rightAnswer, '_', ' ')
      this.type = 'question'
      this.picCount = 3
    } else {
      this.rightAnswer = rightAnswer
      this.alternatives = alternativesArr
      let imgArr = []
      let urlArr = []
      this.getViewsJoiner(imgArr, pathsArr, urlArr)
      console.log(urlArr)
      this.views = imgArr
      this.urlArr = urlArr
      this.rightAnswer = helpers.replaceAll(rightAnswer, '_', ' ')
      this.picCount = 3
    }
  }
  getQuestionDesc () {
    return `Which is the city? pic ${this.picCount}/3`
  }
  alternatives (rightAnswer) {
    let arr = []
    if (rightAnswer in cities.europe) arr = Object.keys(cities.europe)
    if (rightAnswer in cities.north_america) arr = Object.keys(cities.north_america)
    if (rightAnswer in cities.south_america) arr = Object.keys(cities.south_america)
    if (rightAnswer in cities.asia) arr = Object.keys(cities.asia)
    let alt = []
    alt.push(arr.splice(arr.indexOf(rightAnswer), 1)[0])
    alt.push(arr.splice(Math.floor((Math.random() * arr.length) + 0), 1)[0])
    alt.push(arr.splice(Math.floor((Math.random() * arr.length) + 0), 1)[0])
    alt.push(arr.splice(Math.floor((Math.random() * arr.length) + 0), 1)[0])
    this.shuffleCities(alt)
    let alternativeArr = alt.map(s => helpers.replaceAll(s, '_', ' '))
    return alternativeArr
  }

  answer () {
    if (document.querySelector('input[name="answer"]:checked') === null) {
      return false
    }
    let answer = document.querySelector('input[name="answer"]:checked').value
    if (answer === this.rightAnswer) {
      console.log('correct')
      return true
    } else {
      console.log('incorrect')
      return false
    }
  }

  getViews (city, arr, paths, urlArr) {
    let area
    let area1
    city = helpers.replaceAll(city, '_', ' ')
    let city1 = helpers.replaceAll(city, ' ', '_')
    if (city1 in cities.europe) {
      area = 'europe'
      area1 = 'europe'
    }
    if (city1 in cities.north_america) {
      area = 'north america'
      area1 = 'north_america'
    }
    if (city1 in cities.south_america) {
      area = 'south america'
      area1 = 'south_america'
    }
    if (city1 in cities.asia) {
      area = 'asia'
      area1 = 'asia'
    }
    let firstPicArr = []
    let maxZero = cities[area1][city1][0]
    let maxOne = cities[area1][city1][1]
    for (let i = 1; i <= maxZero; i++) {
      firstPicArr.push({folder: 1, pic: i})
    }
    for (let i = 1; i <= maxOne; i++) {
      firstPicArr.push({folder: 2, pic: i})
    }
    this.shuffleCities(firstPicArr)
    let path = `${area}/${city}/${firstPicArr[0].folder}/${firstPicArr[0].pic}.jpg`
    storage.ref().child(path).getDownloadURL().then(function (url) {
      let img = document.createElement('IMG')
      img.src = url
      img.id = 'view'
      arr[0] = img
      paths[0] = path
      urlArr[0] = url
      QuizActions.imgLoaded()
    }).catch(function (error) {
      console.log(error)
    })
    for (let i = 2; i < 4; i++) {
      let path = `${area}/${city}/${i + 1}/${this.rand(cities[area1][city1][i])}.jpg`
      storage.ref().child(path).getDownloadURL().then(function (url) {
        let img = document.createElement('IMG')
        img.src = url
        img.id = 'view'
        arr[i - 1] = img
        paths[i - 1] = path
        urlArr[i - 1] = url
        QuizActions.imgLoaded()
      }).catch(function (error) {
        console.log(error)
      })
    }
  }

  getViewsJoiner (imgArr, pathsArr, urlArr) {
    for (let i = 0; i < 3; i++) {
      storage.ref().child(pathsArr[i]).getDownloadURL().then(function (url) {
        let img = document.createElement('IMG')
        img.src = url
        urlArr[i] = url
        img.id = 'view'
        imgArr[i] = img
        QuizActions.imgLoaded()
      })
    }
  }

  rand (max) {
    return Math.floor((Math.random() * max) + 1)
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

export default MultiPic
