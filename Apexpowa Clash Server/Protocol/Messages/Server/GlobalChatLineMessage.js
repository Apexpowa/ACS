const PiranhaMessage = require('../../PiranhaMessage')

class GlobalChatLineMessage extends PiranhaMessage {
  constructor (client, entry) {
    super()
    this.id = 24715
    this.client = client
    this.version = 1
    this.entry = entry
  }

  async encode () {
    this.writeString(this.entry.message) // Message
    this.writeString(this.entry.name) // Name
    this.writeInt(this.entry.level) // Level
    this.writeLong(this.entry.highID, this.entry.lowID) // ID
    this.writeLong(this.entry.highID, this.entry.lowID) // ID

    if (this.entry.inClan) {
      this.writeByte(1)
      this.writeLong(this.entry.clan.ClanHighID, this.entry.clan.ClanLowID)
      this.writeString(this.entry.clan.name)
      this.writeInt(this.entry.clan.badge)
    } else {
      this.writeByte(0)
    }
  }
}

module.exports = GlobalChatLineMessage