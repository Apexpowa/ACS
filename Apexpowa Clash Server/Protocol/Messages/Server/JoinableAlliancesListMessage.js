const PiranhaMessage = require('../../PiranhaMessage')

class JoinableAlliancesListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24304
    this.client = client
    this.version = 1
  }

  async encode () {
    const db = this.client.mongoose
    //const clans = await db.getJoinableClans(20) // TODO: Joinable clans
    const clans = await db.searchClans('', 20)

    this.writeInt(clans.length) // AlliancesCount
    for (const clan of clans) {
      this.writeLong(clan.highID, clan.lowID) // Id
      this.writeString(clan.name) // Name
      this.writeInt(clan.badge) // Badge
      this.writeInt(clan.type) // Type
      this.writeInt(clan.members?.length || 0) // MembersCount
      this.writeInt(clan.trophies) // Score
      this.writeInt(clan.requiredTrophies) // RequiredScore
    }
  }
}

module.exports = JoinableAlliancesListMessage