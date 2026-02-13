const PiranhaMessage = require('../../PiranhaMessage')

class LeaveAllianceOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24111
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(0x02) // ServerCommandType
    this.writeLong(this.client.player.clan.ClanHighID, this.client.player.clan.ClanLowID) // HighID, LowID
    this.writeInt(1) // Reason: 1 = Leave, 2 = Kick
    this.writeInt(-1)
  }
}

module.exports = LeaveAllianceOkMessage