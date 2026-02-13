const PiranhaMessage = require('../../PiranhaMessage')

class AllianceRankingListMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24401
    this.client = client
    this.version = 1
  }

  async encode () {
    let count = 1

    this.writeInt(count)

    {
      this.writeLong(0, 1) // HighID, LowID
      this.writeString('Clashers') // Name
      this.writeInt(count)
      this.writeInt(3200) // Score
      this.writeInt(200)

      // AllianceRankingEntry
      {
        this.writeInt(13000000) // Badge
        this.writeInt(1) // MemberCount
      }

      if (count >= 199) {
        return
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