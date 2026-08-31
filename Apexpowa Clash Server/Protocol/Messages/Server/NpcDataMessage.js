const PiranhaMessage = require('../../PiranhaMessage')
const ClientHome = require('../../../Logic/ClientHome')
const ClientAvatar = require('../../../Logic/ClientAvatar')

class NpcDataMessage extends PiranhaMessage {
  constructor (client, levelID) {
    super()
    this.id = 24113
    this.client = client
    this.version = 10
    this.levelID = levelID
  }

  async encode () {
    this.writeInt(0)
    new ClientHome().encode(this, this.client.player, 1, this.levelID)
    new ClientAvatar().encode(this, this.client.player)
    this.writeBoolean(true)
    {
      new ClientAvatar().encode(this, this.client.player)
    }
  }
}

module.exports = NpcDataMessage