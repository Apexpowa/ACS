const PiranhaMessage = require('../../PiranhaMessage')
const ClientHome = require('../../../Logic/ClientHome')
const ClientAvatar = require('../../../Logic/ClientAvatar')

class EnemyHomeDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24107
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(10)

    // Someone
    {
      const home = new ClientHome()
      home.encode(this)
      const avatar = new ClientAvatar()
      avatar.encode(this)
    }

    const avatar = new ClientAvatar()
    avatar.encode(this)

    this.writeInt(3)
    this.writeByte(0) // NpcID
  }
}

module.exports = EnemyHomeDataMessage