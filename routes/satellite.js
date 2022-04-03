const path = require('path')
const router = require('express').Router()
const controllers = require(path.join(process.cwd(), '/controllers'))

router.get('/tle', async (request, response) => {
  controllers.satellitePosition.doGetTwoLineElement(request.body.id).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(201).json(new Error())
  })
})

router.get('/position', async (request, response) => {
  controllers.satellitePosition.doGetSatellitePosition(request.body.id, request.body.latitude, request.body.longitude, request.body.elevation, request.body.result).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(201).json(new Error())
  })
})

router.get('/visualPasses', async (request, response) => {
  controllers.satellitePosition.doGetVisualPasses(request.body.id, request.body.latitude, request.body.longitude, request.body.elevation, request.body.days, request.body.visibleLength).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(201).json(new Error())
  })
})

router.get('/radioPasses', async (request, response) => {
  controllers.satellitePosition.doRadioPasses(request.body.id, request.body.latitude, request.body.longitude, request.body.elevation, request.body.days, request.body.minimumElevation).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(201).json(new Error())
  })
})

router.get('/radialPasses', async (request, response) => {
  controllers.satellitePosition.doRadialPasses(request.body.latitude, request.body.longitude, request.body.elevation, request.body.radius, request.body.category).then(data => {
    response.status(200).json(data)
  }).catch(_ => {
    response.status(201).json(new Error())
  })
})

module.exports = router
