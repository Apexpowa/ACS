const PiranhaMessage = require('../../PiranhaMessage')

class ServerErrorMessage extends PiranhaMessage {
  constructor (client, reason) {
    super()
    this.id = 24115
    this.client = client
    this.version = 1
    this.reason = reason
  }

  async encode () {
    this.writeString(this.reason)
  }
}

module.exports = ServerErrorMessage