const path = require('path')
const router = require('express').Router()
const controllers = require(path.join(process.cwd(), '/controllers'))

router.get('/search', async (request, response) => {
  controllers.satellitePosition.doSearch(request.body.name).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(500).json()
  })
})

router.get('/tle/:input', async (request, response) => {
  controllers.satellitePosition.doGetTwoLineElement(request.params.input).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(500).json()
  })
})

router.get('/position/:input', async (request, response) => {
  controllers.satellitePosition.doGetSatellitePosition(request.params.input, request.query.latitude, request.query.longitude, request.query.elevation, request.query.resultLength).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(500).json()
  })
})

router.get('/visualPasses/:input', async (request, response) => {
  controllers.satellitePosition.doGetVisualPasses(request.params.input, request.query.latitude, request.query.longitude, request.query.elevation, request.query.days, request.query.visibleLength).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(500).json()
  })
})

router.get('/radioPasses/:input', async (request, response) => {
  controllers.satellitePosition.doRadioPasses(request.params.input, request.query.latitude, request.query.longitude, request.query.elevation, request.query.days, request.query.minimumElevation).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(500).json()
  })
})

router.get('/radialPasses', async (request, response) => {
  controllers.satellitePosition.doRadialPasses(request.query.latitude, request.query.longitude, request.query.elevation, request.query.radius, request.query.category).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(500).json()
  })
})

module.exports = router
