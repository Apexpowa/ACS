const PiranhaMessage = require('../../PiranhaMessage')

class WarMapMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24335
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(1) // 1 = Searching for Opponents, 4 = Preparation Day, 5 = Battle Day, 6 = End of War
    this.writeInt(3600) // Time left
    this.writeLong(0, 1) // Alliance ID
    this.writeString('Clashers') // Alliance Name
    this.writeInt(13000000) // Alliance Badge Data
    this.writeInt(0) // Alliance Level
    this.writeInt(0) // War Members
  }
}

module.exports = WarMapMessage