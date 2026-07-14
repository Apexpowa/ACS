const PiranhaMessage = require('../../PiranhaMessage')

class FriendListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20105
    this.client = client
    this.version = 3
  }

  async encode () {
    this.writeInt(0)

    this.writeInt(1)
    {
      // FriendEntry::decode
      {
        this.writeLong(0, 1)
        this.writeLong(0, 1)
        this.writeString('sdaiopd')
        this.writeString('sdaiopd2')
        this.writeString('sdaiopd3')
        this.writeInt(0)
        this.writeInt(0)
        this.writeInt(0)
        this.writeBoolean(false)
        if (false) {
          this.writeLong(0, 1)
          this.writeInt(0)
          this.writeString('sdaiopd4')
          this.writeInt(0)
        }
      }
    }
  }
}

module.exports = FriendListMessage