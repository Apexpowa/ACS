const PiranhaMessage = require('../../PiranhaMessage')
const ClientAvatar = require('../../../Logic/ClientAvatar')

class NpcDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24113
    this.client = client
    this.version = 0
  }

  async encode () {
    this.writeByte(1) // Unknown1
    this.writeByte(this.client.player.village) // NpcVillage
    const avatar = new ClientAvatar()
    avatar.encode(this)
    this.writeByte(1) // Unknown2
    this.writeByte(1) // NpcId
  }
}

module.exports = NpcDataMessage