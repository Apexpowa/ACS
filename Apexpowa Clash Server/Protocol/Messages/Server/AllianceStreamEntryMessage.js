const PiranhaMessage = require('../../PiranhaMessage')

class AllianceStreamEntryMessage extends PiranhaMessage {
  constructor (client, message) {
    super()
    this.id = 24312
    this.client = client
    this.version = 1
    this.message = message // { id, senderHighID, senderLowID, senderName, senderRole, message, timestamp }
  }

  async encode () {
    const ageSeconds = Math.floor((Date.now() - new Date(this.message.timestamp).getTime()) / 1000)
    this.writeInt(2) // StreamEntryType
    this.writeLong(this.message.id || 0) // StreamEntryId - from database
    this.writeLong(this.message.senderHighID, this.message.senderLowID) // SenderAvatarId
    this.writeLong(this.message.senderHighID, this.message.senderLowID) // HomeId
    this.writeString(this.message.senderName) // SenderName
    this.writeInt(this.client.player.level) // SenderLevel
    this.writeInt(this.client.player.league) // SenderLeagueType
    this.writeInt(this.message.senderRole) // SenderRole (0-1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader)
    this.writeInt(ageSeconds) // AgeSeconds
    this.writeByte(0) // IsRemoved


    
    this.writeString(this.message.message)
  }
}

module.exports = AllianceStreamEntryMessage