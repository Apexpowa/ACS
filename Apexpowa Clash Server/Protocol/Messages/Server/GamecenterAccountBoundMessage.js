const PiranhaMessage = require('../../PiranhaMessage')

class GamecenterAccountBoundMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24211
    this.client = client
    this.version = 10
  }

  async encode () {
    this.writeInt(1)
  }
}

module.exports = GamecenterAccountBoundMessage