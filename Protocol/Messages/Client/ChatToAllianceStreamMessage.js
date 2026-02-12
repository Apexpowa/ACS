const PiranhaMessage = require('../../PiranhaMessage')
const AllianceStreamEntryMessage = require('../Server/AllianceStreamEntryMessage')

class ChatToAllianceStreamMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14315
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Message = this.readString()

    //console.log(this.data)
  }

  async process () {
    await new AllianceStreamEntryMessage(this.client, this.data.Message).send()
  }
}

module.exports = ChatToAllianceStreamMessage