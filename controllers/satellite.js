// const path = require('path')
const axios = require('axios')

const satellite = {
  doGetTwoLineElement: async function (id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.n2yo.com/rest/v1/satellite/tle/${id}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
        resolve(satellite.data)
      }).catch(_ => {
        reject(new Error())
      })
    })
  },
  doGetSatellitePosition: async function (id, latitude, longitude, elevation, resultLength) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.n2yo.com/rest/v1/satellite/positions/${id}/${latitude}/${longitude}/${elevation}/${resultLength}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
        resolve(satellite.data)
      }).catch(_ => {
        reject(new Error())
      })
    })
  },
  doGetVisualPasses: async function (id, latitude, longitude, elevation, days, visibleLength) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.n2yo.com/rest/v1/satellite/visualpasses/${id}/${latitude}/${longitude}/${elevation}/${days}/${visibleLength}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
        resolve(satellite.data)
      }).catch(_ => {
        reject(new Error())
      })
    })
  },
  doRadioPasses: async function (id, latitude, longitude, elevation, days, minimumElevation) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.n2yo.com/rest/v1/satellite/radiopasses/${id}/${latitude}/${longitude}/${elevation}/${days}/${minimumElevation}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
        resolve(satellite.data)
      }).catch(_ => {
        reject(new Error())
      })
    })
  },
  doRadialPasses: async function (latitude, longitude, elevation, radius, category) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.n2yo.com/rest/v1/satellite/radialpasses/${latitude}/${longitude}/${elevation}/${radius}/${category}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
        resolve(satellite.data)
      }).catch(_ => {
        reject(new Error())
      })
    })
  }
}

module.exports = satellite
