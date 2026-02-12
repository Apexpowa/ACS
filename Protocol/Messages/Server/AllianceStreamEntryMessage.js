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
    this.writeInt(1) // StreamEntryType
    this.writeLong(1) // StreamEntryId
    this.writeLong(this.client.player.highID, this.client.player.lowID) // SenderAvatarId
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HomeId
    this.writeString(this.client.player.name) // SenderName
    this.writeInt(this.client.player.level) // SenderLevel
    this.writeInt(this.client.player.league) // SenderLeagueType
    this.writeInt(4) // SenderRole
    this.writeInt(1) // AgeSeconds
    this.writeByte(0) // IsRemoved
  }
}

module.exports = AllianceStreamEntryMessage