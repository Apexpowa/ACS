const PiranhaMessage = require('../../PiranhaMessage')
const ClientHome = require('../../../Logic/ClientHome')
const ClientAvatar = require('../../../Logic/ClientAvatar')

class EnemyHomeDataMessage extends PiranhaMessage {
  constructor (client, enemy) {
    super()
    this.id = 24107
    this.client = client
    this.version = 1
    this.enemy = enemy
  }

  async encode () {
    this.writeInt(10)

    // Someone
    {
      const home = new ClientHome()
      const avatar = new ClientAvatar()
      home.encode(this, this.enemy)
      avatar.encode(this, this.enemy)
    }

    const avatar = new ClientAvatar()
    avatar.encode(this, this.client.player)

    this.writeInt(3)
    this.writeByte(0) // NpcID
  }
}

module.exports = EnemyHomeDataMessage