const PiranhaMessage = require('../../PiranhaMessage')

class AllianceListMessage extends PiranhaMessage {
  constructor (client, searchString, filters = {}) {
    super()
    this.id = 24310
    this.client = client
    this.version = 1
    this.searchString = searchString || ''
    this.filters = filters
  }

  async encode () {
    const db = this.client.mongoose
    let clans = await db.searchClans(this.searchString, 20)

    // Apply filters
    if (this.filters.minimumMembers) {
      clans = clans.filter(c => (c.members?.length || 0) >= this.filters.minimumMembers)
    }
    if (this.filters.maximumMembers) {
      clans = clans.filter(c => (c.members?.length || 0) <= this.filters.maximumMembers)
    }
    if (this.filters.minimumRequiredTrophies) {
      clans = clans.filter(c => c.requiredTrophies <= this.filters.minimumRequiredTrophies)
    }
    if (this.filters.canJoin) {
      clans = clans.filter(c => c.type !== 2)
    }
    if (this.filters.locationInstanceID) {
      clans = clans.filter(c => c.location === this.filters.locationInstanceID)
    }

    this.writeString(this.searchString) // SearchString
    this.writeInt(clans.length) // AllianceCount
    for (const clan of clans) {
      this.writeLong(clan.highID, clan.lowID) // HighID, LowID
      this.writeString(clan.name) // Name
      this.writeInt(clan.badge) // Badge
      this.writeInt(clan.type) // Type
      this.writeInt(clan.members?.length || 0) // MemberCount
      this.writeInt(clan.trophies) // Score
      this.writeInt(clan.requiredTrophies) // RequiredScore
      this.writeInt(0) // WonWars
      this.writeInt(0) // LostWars
      this.writeInt(0) // DrawWars
      this.writeInt(0x001E8481) // 
      this.writeInt(0) // WarFrequency
      this.writeInt(clan.location || 0) // AllianceOrigin
      this.writeInt(0) // AllianceExperience
      this.writeInt(1) // AllianceLevel
    }
  }
}

module.exports = AllianceListMessage