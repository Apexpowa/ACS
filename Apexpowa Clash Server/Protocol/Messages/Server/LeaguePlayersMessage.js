const PiranhaMessage = require('../../PiranhaMessage')

class LeaguePlayersMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24503
    this.client = client
    this.version = 1
  }

  async encode () {
    let count = 1

    {
      if (count >= 51) {
        return
      }

      this.writeInt(9000)
      this.writeInt(count - 0)
      
      this.writeLong(this.client.player.highID, this.client.player.lowID)
      this.writeString(this.client.player.name) // Name
      this.writeInt(count)
      this.writeInt(this.client.player.trophies) // Trophies
      this.writeInt(count)
      this.writeInt(1) // Level
      this.writeInt(200)
      this.writeInt(count)
      this.writeInt(100)
      this.writeInt(1)
      this.writeLong(0, 1) // HighID, LowID
      this.writeInt(1)
      this.writeInt(1)
      if (this.client.player.inClan === 1)
      {
        this.writeByte(1)
        this.writeLong(0, 1) // HighID, LowID
        this.writeString('Clashers') // Name
        this.writeInt(13000000) // Badge
      }
      else {
        this.writeByte(0)
      }

      count += 1
    }
  }
}

module.exports = LeaguePlayersMessage