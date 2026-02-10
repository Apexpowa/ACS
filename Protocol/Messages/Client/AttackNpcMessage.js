const PiranhaMessage = require('../../PiranhaMessage')
const NpcDataMessage = require('../Server/NpcDataMessage')

class AttackNpcMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14134
    this.version = 1
  }

  async decode () {}

  async process () {
    await new NpcDataMessage(this.client).send()
  }
}

module.exports = AttackNpcMessage