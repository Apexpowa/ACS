const PiranhaMessage = require('../../PiranhaMessage')

class GlobalChatLineMessage extends PiranhaMessage {
  constructor (client, message) {
    super()
    this.id = 24715
    this.client = client
    this.version = 1
    this.message = message
  }

  async encode () {
    this.writeString(this.message) // Message
    this.writeString(this.client.player.name) // Name
    this.writeInt(this.client.player.level) // Level
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
    
    if (this.client.player.inClan === 1) {
      this.writeByte(1) // IsInAlliance
      this.writeLong(this.client.player.clan.ClanHighID, this.client.player.clan.ClanLowID) // HighID, LowID
      this.writeString(this.client.player.clan.ClanName) // Name
      this.writeInt(this.client.player.clan.ClanBadge) // Badge
    }
  }
}

module.exports = GlobalChatLineMessage