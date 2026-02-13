const PiranhaMessage = require('../../PiranhaMessage')
const ClientHome = require('../../../Logic/ClientHome')
const ClientAvatar = require('../../../Logic/ClientAvatar')

class VisitedHomeDataMessage extends PiranhaMessage {
  constructor (client, player) {
    super()
    this.id = 24113
    this.client = client
    this.version = 1
    this.player = player
  }

  async encode () {
    this.writeInt(0)

    const someonesHome = new ClientHome()
    someonesHome.encode(this, this.player)
    const someonesAvatar = new ClientAvatar()
    someonesAvatar.encode(this, this.player)

    this.writeByte(1)
    const avatar = new ClientAvatar()
    avatar.encode(this, this.client.player)
  }
}

module.exports = VisitedHomeDataMessage