const axios = require('axios')
const { integer } = require('twilio/lib/base/deserialize')

const satellite = {
  doSearch: async function (name) {
    return new Promise((resolve, reject) => {
      axios.get('https://tle.ivanstanojevic.me/api/tle', { params: { search: name } }).then(satellite => {
        resolve(satellite.data.member.pop())
      }).catch(_ => {
        reject(new Error())
      })
    })
  },
  doGetTwoLineElement: async function (input) {
    return new Promise((resolve, reject) => {
      if (typeof input === 'number') {
        axios.get(`https://api.n2yo.com/rest/v1/satellite/tle/${input}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
          resolve(satellite.data)
        }).catch(_ => {
          reject(new Error())
        })
      } else if (typeof input === 'string') {
        this.doSearch(input).then(data => {
          axios.get(`https://api.n2yo.com/rest/v1/satellite/tle/${data.satelliteId}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
            resolve(satellite.data)
          }).catch(_ => {
            reject(new Error())
          })
        }).catch(_ => {
          reject(new Error())
        })
      } else {
        reject(new Error())
      }
    })
  },
  doGetSatellitePosition: async function (input, latitude, longitude, elevation, resultLength) {
    return new Promise((resolve, reject) => {
      if (typeof input === 'number') {
        axios.get(`https://api.n2yo.com/rest/v1/satellite/tle/${input}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
          resolve(satellite.data)
        }).catch(_ => {
          reject(new Error())
        })
      } else if (typeof input === 'string') {
        this.doSearch(input).then(data => {
          axios.get(`https://api.n2yo.com/rest/v1/satellite/positions/${data.satelliteId}/${latitude}/${longitude}/${elevation}/${resultLength}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
            resolve(satellite.data)
          }).catch(_ => {
            reject(new Error())
          })
        }).catch(_ => {
          reject(new Error())
        })
      } else {
        reject(new Error())
      }
    })
  },
  doGetVisualPasses: async function (input, latitude, longitude, elevation, days, visibleLength) {
    return new Promise((resolve, reject) => {
      if (typeof input === 'number') {
        axios.get(`https://api.n2yo.com/rest/v1/satellite/visualpasses/${input}/${latitude}/${longitude}/${elevation}/${days}/${visibleLength}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
          resolve(satellite.data)
        }).catch(_ => {
          reject(new Error())
        })
      } else if (typeof input === 'string') {
        this.doSearch(input).then(data => {
          axios.get(`https://api.n2yo.com/rest/v1/satellite/visualpasses/${data.satelliteId}/${latitude}/${longitude}/${elevation}/${days}/${visibleLength}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
            resolve(satellite.data)
          }).catch(_ => {
            reject(new Error())
          })
        }).catch(_ => {
          reject(new Error())
        })
      } else {
        reject(new Error())
      }
    })
  },
  doRadioPasses: async function (input, latitude, longitude, elevation, days, minimumElevation) {
    return new Promise((resolve, reject) => {
      if (typeof input === 'number') {
        axios.get(`https://api.n2yo.com/rest/v1/satellite/radiopasses/${input}/${latitude}/${longitude}/${elevation}/${days}/${minimumElevation}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
          resolve(satellite.data)
        }).catch(_ => {
          reject(new Error())
        })
      } else if (typeof input === 'string') {
        this.doSearch(input).then(data => {
          axios.get(`https://api.n2yo.com/rest/v1/satellite/radiopasses/${data.satelliteId}/${latitude}/${longitude}/${elevation}/${days}/${minimumElevation}`, { params: { apiKey: process.env.API_KEY } }).then(satellite => {
            resolve(satellite.data)
          }).catch(_ => {
            reject(new Error())
          })
        }).catch(_ => {
          reject(new Error())
        })
      } else {
        reject(new Error())
      }
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
