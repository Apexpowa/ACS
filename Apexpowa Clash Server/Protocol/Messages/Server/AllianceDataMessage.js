const PiranhaMessage = require('../../PiranhaMessage')
const LeagueUtils = require('../../../Utilities/LeagueUtils')

class AllianceDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24301
    this.client = client
    this.version = 1
  }

  async encode () {
    let count = 1

    // AllianceFullEntry
    {
      // AllianceHeaderEntry
      {
        this.writeLong(0, 1) // HighID, LowID
        this.writeString('Clashers') // Name
        this.writeInt(13000000) // Badge
        this.writeInt(1) // Type
        this.writeInt(count) // MemberCount
        this.writeInt(3200) // Score
        this.writeInt(0) // RequiredScore
        this.writeInt(0) // WonWars
        this.writeInt(0) // LostWars
        this.writeInt(0) // DrawWars
        this.writeInt(2000001)
        this.writeInt(0) // WarFrequency
        this.writeInt(0) // AllianceOrigin
        this.writeInt(0) // AllianceExperience
        this.writeInt(1) // AllianceLevel
      }

      this.writeString('Test description') // Description
      this.writeInt(0x04)
      this.writeByte(1)
      this.writeInt(0x03)
      this.writeInt(0x0008A5DF)

      this.writeInt(count) // MemberCount
      for (var i = 0; i < count; i++) {
        // AllianceMemberEntry
        {
          this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
          this.writeString(this.client.player.name) // Name
          this.writeInt(2) // Role (0-1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader)
          this.writeInt(this.client.player.level) // Level
          this.writeInt(LeagueUtils.getLeagueByScore(this.client.player.trophies)) // League
          this.writeInt(this.client.player.trophies) // Score
          this.writeInt(200) // Donations
          this.writeInt(100) // DonationsReceived
          this.writeInt(1) // Order
          this.writeInt(1) // PreviousOrder
          this.writeByte(0) // IsNewMember
          this.writeInt(0) // WarCooldown
          this.writeInt(1) // WarOptInStatus
          this.writeByte(1) // HasHomeID
          this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
        }
      }
    }
  }
}

module.exports = AllianceDataMessage