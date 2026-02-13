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
    
    const home = new ClientHome()
    home.encode(this, this.client.player)
    const avatar = new ClientAvatar()
    avatar.encode(this, this.client.player)
  }
}

module.exports = OwnHomeDataMessage