const PiranhaMessage = require('../../PiranhaMessage')

class AllianceStreamEntryMessage extends PiranhaMessage {
  constructor (client, message) {
    super()
    this.id = 24312
    this.client = client
    this.version = 1
    this.message = message
  }

  async encode () {
    this.writeInt(2) // StreamEntryType
    this.writeLong(Math.floor(Math.random() * 0x7FFFFFFF)) // StreamEntryId // when a db is added, this should be a new msg id instead of the same id to prevent same msg going into the box
    this.writeLong(this.client.player.highID, this.client.player.lowID) // SenderAvatarId
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HomeId
    this.writeString(this.client.player.name) // SenderName
    this.writeInt(this.client.player.level) // SenderLevel
    this.writeInt(this.client.player.league) // SenderLeagueType
    this.writeInt(2) // SenderRole (0-1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader)
    this.writeInt(1) // AgeSeconds
    this.writeByte(0) // IsRemoved

    this.writeString(this.message)
  }
}

module.exports = AllianceStreamEntryMessage
