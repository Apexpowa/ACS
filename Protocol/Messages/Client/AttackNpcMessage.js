const PiranhaMessage = require('../../PiranhaMessage')
const NpcDataMessage = require('../Server/NpcDataMessage')

class AttackNpcMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14134
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.LevelID = this.readInt()

    console.log(this.data)
  }

  async process () {
    await new NpcDataMessage(this.client, this.data.LevelID).send()
  }
}

module.exports = AttackNpcMessage