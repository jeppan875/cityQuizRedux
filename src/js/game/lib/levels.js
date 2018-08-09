const citiesLib = require('./cities')
const cities = citiesLib.cities
const skylineLib = require('./skylineLib')
const skyline = skylineLib.skylineLib

let checkLevel = function (exp) {
  if (exp >= 0 && exp < 100) {
    return 1
  } else if (exp >= 100 && exp < 300) {
    return 2
  } else if (exp >= 300 && exp < 600) {
    return 3
  }
}

const levels = {
  1: {
    getMultipic () {
      let europe = Object.keys(cities.europe).slice(0, 10)
      let northAmerica = Object.keys(cities.north_america).slice(0, 4)
      let southAmerica = Object.keys(cities.south_america).slice(0, 2)
      let asia = Object.keys(cities.asia).slice(0, 4)
      return europe.concat(northAmerica, southAmerica, asia)
    },
    getSkyline () {
      return Object.keys(skyline).slice(0, 7)
    }
  },
  2: {
    getMultipic () {
      let europe = Object.keys(cities.europe).slice(0, 15)
      let northAmerica = Object.keys(cities.north_america).slice(0, 6)
      let southAmerica = Object.keys(cities.south_america).slice(0, 4)
      let asia = Object.keys(cities.asia).slice(0, 6)
      return europe.concat(northAmerica, southAmerica, asia)
    },
    getSkyline () {
      return Object.keys(skyline).slice(0, 12)
    }
  }
}

module.exports = {
  levels, checkLevel
}
