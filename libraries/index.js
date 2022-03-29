const path = require('path')

const libraries = {
  SMS: require(path.join(process.cwd(), '/libraries/sms'))
}

module.exports = libraries
