const PiranhaMessage = require('../../PiranhaMessage')
const VisitedHomeDataMessage = require('../Server/VisitedHomeDataMessage')

class VisitHomeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14113
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.HighID = this.readInt()
    this.data.LowID = this.readInt()

    //console.log(this.data)
  }

  async process () {
    await new VisitedHomeDataMessage(this.client).send()
  }
}

module.exports = VisitHomeMessage