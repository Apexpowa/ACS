const PiranhaMessage = require('../../PiranhaMessage')

class AllianceStreamMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24311
    this.client = client
    this.version = 1
    this.highID = this.client?.player?.clan?.ClanHighID ?? 0
    this.lowID = this.client?.player?.clan?.ClanLowID ?? 1
  }

  async encode () {
    const db = this.client.mongoose
    const clan = await db.getClanByID(this.highID, this.lowID)
    const messages = Array.isArray(clan?.messages) ? clan.messages : []

    this.writeInt(messages.length) // StreamEntryCount
    for (const message of messages) {
      const ageSeconds = Math.floor((Date.now() - new Date(message.timestamp).getTime()) / 1000)
      this.writeInt(2) // StreamEntryType
      this.writeLong(message.id || 0) // StreamEntryId
      this.writeLong(message.senderHighID, message.senderLowID) // SenderAvatarId
      this.writeLong(message.senderHighID, message.senderLowID) // HomeId
      this.writeString(message.senderName) // SenderName
      this.writeInt(message.senderLevel || 1) // SenderLevel
      this.writeInt(message.senderLeague || 0) // SenderLeagueType
      this.writeInt(message.senderRole || 1) // SenderRole
      this.writeInt(ageSeconds) // AgeSeconds
      this.writeByte(0) // IsRemoved


      
      this.writeString(message.message) // Message
    }
  }
}

module.exports = AllianceStreamMessage