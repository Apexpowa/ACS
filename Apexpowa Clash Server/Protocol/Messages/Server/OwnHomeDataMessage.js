const PiranhaMessage = require('../../PiranhaMessage')
const ClientHome = require('../../../Logic/ClientHome')
const ClientAvatar = require('../../../Logic/ClientAvatar')

class OwnHomeDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24101
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(0) // SecondsSinceLastSave
    new ClientHome().encode(this, this.client.player, 0)
    new ClientAvatar().encode(this, this.client.player)
    this.writeInt(0)
  }
}

module.exports = OwnHomeDataMessage