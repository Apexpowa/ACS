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
      new ClientHome().encode(this, this.enemy, 0)
      new ClientAvatar().encode(this, this.enemy)
    }

    new ClientAvatar().encode(this, this.client.player)

    this.writeInt(3)
    this.writeInt(0)
  }
}

module.exports = EnemyHomeDataMessage