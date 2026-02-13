const PiranhaMessage = require('../../PiranhaMessage')
const LeagueUtils = require('../../../Utilities/LeagueUtils')

class AvatarLocalRankingListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24404
    this.client = client
    this.version = 1
  }

  async encode () {
    let count = 1

    this.writeInt(count)

    {
      this.writeLong(0, 1) // HighID, LowID
      this.writeString('Chief') // Name
      this.writeInt(count)
      this.writeInt(3200) // Score
      this.writeInt(200)

      // AvatarRankingEntry
      {
        this.writeInt(1) // Level
        this.writeInt(0) // AttackWinCount
        this.writeInt(0) // AttackLoseCount
        this.writeInt(0) // DefenseWinCount
        this.writeInt(0) // DefenseLoseCount
        this.writeInt(LeagueUtils.getLeagueByScore(3200)) // LeagueType

        this.writeString('US') // Country
        this.writeLong(0, 1) // Home Id

        // Alliance
        {
          this.writeBoolean(true)
          this.writeLong(0,1) // HighID, LowID
          this.writeString('Clashers') // Name
          this.writeInt(13000000) // Badge
        }
      }

      count += 1
    }

    this.writeInt(count)
  }
}

module.exports = AvatarLocalRankingListMessage