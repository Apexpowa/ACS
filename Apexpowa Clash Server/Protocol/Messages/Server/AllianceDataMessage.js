const PiranhaMessage = require('../../PiranhaMessage')

class AllianceDataMessage extends PiranhaMessage {
  constructor (client, allianceId) {
    super()
    this.id = 24301
    this.client = client
    this.version = 1
    this.AllianceId = allianceId
  }

  async encode () {
    const db = this.client.mongoose
    const clan = await db.getClanByID(this.AllianceId[0], this.AllianceId[1])
    const clanHighID = clan ? clan.highID : this.AllianceId[0]
    const clanLowID = clan ? clan.lowID : this.AllianceId[1]
    const clanName = clan ? clan.name : 'Clashers'
    const clanBadge = clan ? clan.badge : 1
    const clanType = clan ? clan.type : 0
    const clanDesc = clan ? clan.description : ''
    const clanScore = clan ? clan.trophies : 0
    const clanReqScore = clan ? clan.requiredTrophies : 0
    const members = clan ? clan.members : []
    const memberCount = members.length || 0
    const location = clan ? clan.location : 0

    //if (!clan) return // if the clan doesnt exist then just return

    // AllianceFullEntry
    {
      // AllianceHeaderEntry
      {
        this.writeLong(clanHighID, clanLowID) // HighID, LowID
        this.writeString(clanName) // Name
        this.writeInt(clanBadge) // Badge
        this.writeInt(clanType) // Type
        this.writeInt(memberCount) // MemberCount
        this.writeInt(clanScore) // Score
        this.writeInt(clanReqScore) // RequiredScore
        this.writeInt(0) // WonWars
        this.writeInt(0) // LostWars
        this.writeInt(0) // DrawWars
        this.writeInt(2000001)
        this.writeInt(0) // WarFrequency
        this.writeInt(location) // AllianceOrigin
        this.writeInt(0) // AllianceExperience
        this.writeInt(1) // AllianceLevel
      }

      this.writeString(clanDesc) // Description
      this.writeInt(0x04)
      this.writeByte(1)
      this.writeInt(0x03)
      this.writeInt(0x0008A5DF)

      this.writeInt(memberCount) // MemberCount
      const allianceMembers = [...members].sort((a, b) => (b.trophies || 0) - (a.trophies || 0))
      allianceMembers.forEach((member, index) => {
        // AllianceMemberEntry
        {
          this.writeLong(member.highID, member.lowID) // HighID, LowID
          this.writeString(member.name) // Name
          this.writeInt(member.role) // Role (0-1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader)
          this.writeInt(member.level) // Level
          this.writeInt(member.league) // League
          this.writeInt(member.trophies) // Score
          this.writeInt(0) // Donations
          this.writeInt(0) // DonationsReceived
          this.writeInt(1) // Order
          this.writeInt(1) // PreviousOrder
          this.writeByte(0) // IsNewMember
          this.writeInt(0) // WarCooldown
          this.writeInt(1) // WarOptInStatus
          this.writeByte(1) // HasHomeID
          this.writeLong(member.highID, member.lowID) // HighID, LowID
        }
      })
    }
  }
}

module.exports = AllianceDataMessage