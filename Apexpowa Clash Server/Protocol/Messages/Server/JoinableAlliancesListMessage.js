const PiranhaMessage = require('../../PiranhaMessage')

class JoinableAlliancesListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24304
    this.client = client
    this.version = 1
  }

  async encode () {
    let count = 1

    this.writeInt(count)

    {
      this.writeLong(0, 1) // Id
      this.writeString('Clashers') // Name
      this.writeInt(13000000) // Badge
      this.writeInt(1) // Type
      this.writeInt(1) // MembersCount
      this.writeInt(3200) // Score
      this.writeInt(0) // RequiredScore
    }
  }
}

module.exports = JoinableAlliancesListMessage