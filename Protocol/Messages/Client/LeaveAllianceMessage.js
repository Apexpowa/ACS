const PiranhaMessage = require('../../PiranhaMessage')
const LeaveAllianceOkMessage = require('../Server/LeaveAllianceOkMessage')

class LeaveAllianceMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14308
    this.version = 1
  }

  async decode () {}

  async process () {
    await new LeaveAllianceOkMessage(this.client).send()
  }
}

module.exports = LeaveAllianceMessage