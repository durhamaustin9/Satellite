const path = require('path')
const db = require(path.join(process.cwd(), '/models'))
const libraries = require(path.join(process.cwd(), '/libraries'))
const JWT = require('jsonwebtoken')

const user = {
  /**
   * All Authentication methods for a user
   */
  auth: {
    /**
     * Request a verification code by SMS on an active user
     * @param phoneNumber - The user phone number to request code
     * @returns {Promise<undefined|Error>}
     */
    doRequestVerificationCode: function (phoneNumber) {
      return new Promise((resolve, reject) => {
        db.models.user.findOne({
          where: {
            phoneNumber: phoneNumber,
            isActive: true
          },
          raw: true
        }).then(user => {
          if (user !== null) {
            const verificationCode = Math.floor(100000 + Math.random() * 900000)

            db.models.user.update({
              verificationCode: verificationCode
            }, {
              where: {
                id: user.id
              }
            }).then(_ => {
              new libraries.SMS().doSend(phoneNumber, `(${process.env.APP_NAME}) Hey ${user.firstName}, Your login code is ${verificationCode}`).then(_ => {
                resolve()
              }).catch(error => {
                reject(error)
              })
            }).catch(error => {
              reject(error)
            })
          } else {
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * Authorize a user using a phone number and verification code
     * @param phoneNumber - The user phone number to request code
     * @param verificationCode - The verification code received by the user
     * @returns {Promise<Object|Error>}
     */
    doAuthenticate: function (phoneNumber, verificationCode) {
      return new Promise((resolve, reject) => {
        db.models.user.findOne({
          where: {
            phoneNumber: phoneNumber,
            verificationCode: verificationCode,
            isActive: true
          }
        }).then(user => {
          if (user !== null) {
            db.models.user.update({
              verificationCode: null
            }, {
              where: {
                id: user.id
              }
            }).then(_ => {
              const token = JWT.sign({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber
              }, process.env.JWT_KEY, { expiresIn: '30d' })

              resolve({
                id: user.id,
                fullName: user.fullName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                token: token
              })
            }).catch(error => {
              reject(error)
            })
          } else {
            reject(new Error())
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  },

  /**
   * Create a user within the users table
   * @param user | Object with keys and values according to users table
   * @returns {Promise<Object|Error>}
   */
  doCreate (user) {
    return new Promise((resolve, reject) => {
      db.models.user.create(user).then(user => {
        resolve(user)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * Updates a user within the users table
   * @param id | The ID of the user (user.id)
   * @param user | Object with keys and values that will be updated base by the user's id.
   * @returns {Promise<undefined|Error>}
   */
  doUpdate (id, user) {
    return new Promise((resolve, reject) => {
      db.models.user.update(user, {
        where: {
          id: id
        }
      }).then(_ => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * Deletes a user within the users table - (Does not remove row, marks as destroyed)
   * @param id | The ID of the user (user.id)
   * @returns {Promise<undefined|Error>}
   */
  doDestroy (id) {
    return new Promise((resolve, reject) => {
      db.models.user.destroy({
        where: {
          id: id
        }
      }).then(_ => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

module.exports = user
