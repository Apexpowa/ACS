const PiranhaMessage = require('../../PiranhaMessage')
const GlobalChatLineMessage = require('../Server/GlobalChatLineMessage')

  class SendGlobalChatLineMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14715
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Message = this.readString()

    //console.log(this.data)
  }

  async process () {
    await new GlobalChatLineMessage(this.client, this.data.Message).send()
  }
}

module.exports = SendGlobalChatLineMessage