const PiranhaMessage = require('../../PiranhaMessage')
const ClientAvatar = require('../../../Logic/ClientAvatar')

class AvatarProfileMessage extends PiranhaMessage {
  constructor (client, player) {
    super()
    this.id = 24334
    this.client = client
    this.version = 1
    this.player = player
  }

  async encode () {
    const avatar = new ClientAvatar()
    avatar.encode(this, this.player)

    this.writeInt(0) // Donations
    this.writeInt(0) // DonationsReceived
  }
}

module.exports = AvatarProfileMessage