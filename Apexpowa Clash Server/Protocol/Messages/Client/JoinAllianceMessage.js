const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')

class JoinAllianceMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14305
    this.version = 1
  }

  async decode () {}

  async process () {
    await new AvailableServerCommandMessage(this.client, 1).send()
  }
}

module.exports = JoinAllianceMessage