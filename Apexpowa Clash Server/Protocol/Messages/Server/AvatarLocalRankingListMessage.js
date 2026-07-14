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
        {
          this.writeBoolean(false)
          /*this.writeLong(0,1) // HighID, LowID
          this.writeString('Clashers') // Name
          this.writeInt(13000000) // Badge*/
        }
      }
    }

    this.writeInt(players.length)
  }
}

module.exports = AvatarLocalRankingListMessage