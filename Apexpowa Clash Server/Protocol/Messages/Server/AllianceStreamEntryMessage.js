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
    //this.writeLong(this.message.senderHighID, this.message.senderLowID) // SenderAvatarId
    //this.writeLong(this.message.senderHighID, this.message.senderLowID) // HomeId
    this.writeString(null) // FacebookID
    this.writeString(this.message.senderName ?? '') // SenderName
    this.writeInt(this.message.senderLevel ?? 1) // SenderLevel
    this.writeInt(this.message.senderRole ?? 1) // SenderRole (0-1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader)
    this.writeInt(ageSeconds ?? 0) // AgeSeconds
    this.writeBoolean(this.message.isRemoved ?? false) // IsRemoved


    
    this.writeString(this.message.message ?? '') // Message
  }
}

module.exports = AllianceStreamEntryMessage