const path = require('path')
const router = require('express').Router()

const controllers = require(path.join(process.cwd(), '/controllers'))

/**
 *  Request a verification user from the query: phoneNumber
 */
router.get('/auth', async (request, response) => {
  controllers.user.auth.doRequestVerificationCode(request.query.phoneNumber).then(data => {
    response.status(200).json(data)
  }).catch(error => {
    response.status(500).json({ error: error.message })
  })
})

/**
 * Request Authorization from the body: phoneNumber and verificationCode
 */
router.post('/auth', async (request, response) => {
  controllers.user.auth.doAuthenticate(request.body.phoneNumber, request.body.verificationCode).then(data => {
    response.status(200).json(data)
  }).catch(error => {
    response.status(500).json({ error: error.message })
  })
})

module.exports = router
