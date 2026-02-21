const PiranhaMessage = require('../../PiranhaMessage')
const LeagueUtils = require('../../../Utilities/LeagueUtils')

class AllianceAllEntryMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24311
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeInt(0)

    // Entry
    {
      this.writeInt(2) // StreamType
      this.writeInt(0) // MessageHighID
      this.writeInt(1) // MessageLowID
      this.writeByte(3) // BOOM

      this.writeLong(this.client.player.highID, this.client.player.lowID) // SenderHighID, SenderLowID
      this.writeLong(this.client.player.highID, this.client.player.lowID) // SenderHighID, SenderLowID
      this.writeString(this.client.player.AllianceAllEntryMessage) // SenderName

      this.writeInt(this.client.player.level) // SenderLevel
      this.writeInt(LeagueUtils.getLeagueByScore(this.client.player.trophies)) // SenderLeague
      this.writeInt(2) // SenderRole (0-1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader)
      this.writeInt(6200) // Time
      
      this.writeInt(1) // Count
      {
        this.writeString('test')
      }      
    }
  }
}

module.exports = AllianceAllEntryMessage