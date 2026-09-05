const PiranhaMessage = require('../../PiranhaMessage')

class SetDeviceTokenMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10113
    this.version = 10
  }

  async decode () {}

  async process () {}
}

module.exports = SetDeviceTokenMessage