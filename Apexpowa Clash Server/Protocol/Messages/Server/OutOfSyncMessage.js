const PiranhaMessage = require('../../PiranhaMessage')

class OutOfSyncMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24104
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(0)
    this.writeInt(0)
    this.writeInt(0)
  }
}

module.exports = OutOfSyncMessage