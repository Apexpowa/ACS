const PiranhaMessage = require('../../PiranhaMessage')

class AllianceRankingListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24401
    this.client = client
    this.version = 1
  }

  async encode () {
    const db = this.client.mongoose
    const clans = await db.getTopClans(200)

    this.writeInt(clans.length) // AlliancesCount

    for (let i = 0; i < clans.length; i++) {
      const clan = clans[i]

      this.writeLong(clan.highID, clan.lowID) // HighID, LowID
      this.writeString(clan.name) // Name
      this.writeInt(i + 1)
      this.writeInt(clan.trophies || 0) // Score
      this.writeInt(200)

      // AllianceRankingEntry
      {
        this.writeInt(clan.badge) // Badge
        this.writeInt(clan.members?.length) // MemberCount
      }
    }

    this.writeInt(604800) // Tournament Seconds left - 7 Days -> 604800

    this.writeInt(3) // Reward Count
    this.writeInt(10000) // #1 Reward
    this.writeInt(5000) // #2 Reward
    this.writeInt(3000) // #3 Reward
  }
}

module.exports = AllianceRankingListMessage