const PiranhaMessage = require('../../PiranhaMessage')
const ClientHome = require('../../../Logic/ClientHome')
const ClientAvatar = require('../../../Logic/ClientAvatar')

class VisitedHomeDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24113
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(0)

    const someonesHome = new ClientHome()
    someonesHome.encode(this)
    const someonesAvatar = new ClientAvatar()
    someonesAvatar.encode(this)

    this.writeByte(1)
    const avatar = new ClientAvatar()
    avatar.encode(this)
  }
}

module.exports = VisitedHomeDataMessage