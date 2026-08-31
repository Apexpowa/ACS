const PiranhaMessage = require('../../PiranhaMessage')

class AllianceWarMapDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24335
    this.client = client
    this.version = 1
  }

  async encode () {
    const db = this.client.mongoose
    const clan = await db.getClanByID(this.client.player.clan.ClanHighID, this.client.player.clan.ClanLowID)
    const clanHighID = clan ? clan.highID : this.AllianceId[0]
    const clanLowID = clan ? clan.lowID : this.AllianceId[1]
    const clanName = clan ? clan.name : 'Clashers'
    const clanBadge = clan ? clan.badge : 1
    const members = clan ? clan.members : []
    const memberCount = members.length || 0

    this.writeInt(1) // 0 = Not active, 1 = Searching for Opponents, 4 = Preparation Day, 5 = Battle Day, 6 = End of War
    this.writeInt(3600) // Timeleft
    this.writeLong(clanHighID, clanLowID) // AllianceID
    this.writeString(clanName) // AllianceName
    this.writeInt(clanBadge) // AllianceBadge
    this.writeInt(1) // AllianceLevel
    this.writeInt(0)/*memberCount) // MemberCount
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
        this.writeBoolean(false) // IsNewMember
        this.writeInt(0) // WarCooldown
        this.writeInt(1) // WarOptInStatus
        this.writeBoolean(true) // HasHomeID
        this.writeLong(member.highID, member.lowID) // HighID, LowID
      }
    })*/
  }
}

module.exports = AllianceWarMapDataMessage