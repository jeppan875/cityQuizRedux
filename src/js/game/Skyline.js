import fire from '../../fire'
import * as QuizActions from '../actions/QuizActions'
const helpers = require('./lib/helpers')
const storage = fire.storage()
const skylineLib = require('./lib/skylineLib')

class Skyline {
  constructor (rightAnswer, isMultiplayer, alternativesArr, pathsArr) {
    this.time = 15
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
      this.type = 'skyline'
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
    }
  }
  getQuestionDesc () {
    return 'Where is this skyline?'
  }
  alternatives (rightAnswer) {
    let arr = []
    arr = Object.keys(skylineLib.skylineLib)
    let alt = []
    alt.push(arr.splice(arr.indexOf(rightAnswer), 1)[0])
    alt.push(arr.splice(Math.floor((Math.random() * arr.length) + 0), 1)[0])
    alt.push(arr.splice(Math.floor((Math.random() * arr.length) + 0), 1)[0])
    alt.push(arr.splice(Math.floor((Math.random() * arr.length) + 0), 1)[0])
    this.shuffleCities(alt)
    let alternativeArr = alt.map(s => helpers.replaceAll(s, '_', ' '))
    return alternativeArr
  }

  getViews (city, arr, paths, urlArr) {
    console.log(city)
    let arrSkyline = skylineLib.skylineLib[city]
    this.shuffleCities(arrSkyline)
    storage.ref().child(arrSkyline[0]).getDownloadURL().then(function (url) {
      let img = document.createElement('IMG')
      img.src = url
      img.id = 'view'
      arr[0] = img
      urlArr[0] = url
      paths[0] = arrSkyline[0]
      QuizActions.imgLoaded()
    }).catch(function (error) {
      console.log(error)
    })
  }

  getViewsJoiner (imgArr, pathsArr, urlArr) {
    console.log(pathsArr[0])
    storage.ref().child(pathsArr[0]).getDownloadURL().then(function (url) {
      let img = document.createElement('IMG')
      img.src = url
      img.id = 'view'
      console.log(img)
      imgArr[0] = img
      urlArr[0] = url
      QuizActions.imgLoaded()
    }).catch(function (error) {
      console.log(error)
    })
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

// module.exports = Skyline
export default Skyline
