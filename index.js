#!/usr/bin/env node

const fs = require('fs')
const _ = require('lodash')
const findInFiles = require('find-in-files')

const file = process.argv[3]


if (process.argv[2] === '--pip') {
  const destFile = 'pip-routes.txt'

  findInFiles
    .find({ term: /path: .+,/, flags: 'g' }, file, 'routes.js')
    .then((res) => {
      fs.writeFileSync(destFile, '', 'utf8')
      let arrOfValues = _.values(res)

      arrOfValues = arrOfValues.map((val) => {
        return val.matches
      })

      arrOfValues =  _.flattenDeep(arrOfValues).map((val) => {
        return val.split(`'`).join('').split(',').join('').split('path:').join('').split(' ').join('')
      })

      fs.openSync(destFile, 'w')

      console.log(`See routes in: ${destFile}`)

      arrOfValues.forEach((val) => {
        fs.appendFileSync(destFile, `${val}\n`, 'utf8')
      })
    })
} else if (process.argv[2] === '--nav') {
  const destFile = 'nav-routes.txt'

  findInFiles
    .find({ term: /when\('.+',/, flags: 'g' }, file, 'config.js')
    .then((res) => {
      fs.writeFileSync(destFile, '', 'utf8')
      let arrOfValues = _.values(res)

      arrOfValues = arrOfValues.map((val) => {
        return val.matches
      })

      arrOfValues =  _.flattenDeep(arrOfValues).map((val) => {
        return val.split(`'`).join('').split(',').join('').split('when(').join('').split(' ').join('')
      })

      fs.openSync(destFile, 'w')

      console.log(`See routes in: ${destFile}`)

      arrOfValues.forEach((val) => {
        fs.appendFileSync(destFile, `${val}\n`, 'utf8')
      })
    })
}

