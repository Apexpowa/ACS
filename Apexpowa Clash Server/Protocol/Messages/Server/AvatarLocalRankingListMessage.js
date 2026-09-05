const PiranhaMessage = require('../../PiranhaMessage')

class AvatarLocalRankingListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24404
    this.client = client
    this.version = 1
  }

  async encode () {
    const db = this.client.mongoose
    const players = await db.getLocalPlayers(200)
    const clanCache = {}

    this.writeInt(players.length) // PlayerCount
    for (var i = 0; i < players.length; i++)
    {
      const player = players[i]

      this.writeLong(player.highID, player.lowID) // HighID, LowID
      this.writeString(player.name) // Name
      this.writeInt(i + 1)
      this.writeInt(player.trophies) // Score
      this.writeInt(200)

      // AvatarRankingEntry
      {
        this.writeInt(player.level) // Level
        this.writeInt(player.attackWinCount) // AttackWinCount
        this.writeInt(player.attackLoseCount) // AttackLoseCount
        this.writeInt(player.defendWinCount) // DefenseWinCount
        this.writeInt(player.defendLoseCount) // DefenseLoseCount
        this.writeInt(player.league) // LeagueType

        this.writeString('US') // Country
        this.writeLong(player.highID, player.lowID) // Home Id

        // Alliance
        if (player.inClan) {
          const clanKey = `${player.clan.ClanHighID}:${player.clan.ClanLowID}`
          let clan = clanCache[clanKey]
          if (clan === undefined) {
              clan = await db.getClanByID(player.clan.ClanHighID, player.clan.ClanLowID)
              clanCache[clanKey] = clan || null
          }
          if (clan) {
              this.writeBoolean(true)
              this.writeLong(clan.highID, clan.lowID)
              this.writeString(clan.name)
              this.writeInt(clan.badge)
          } else {
              this.writeBoolean(false)
          }
        } else {
            this.writeBoolean(false)
        }
      }
    }

    this.writeInt(players.length)
  }
}

module.exports = AvatarLocalRankingListMessage
