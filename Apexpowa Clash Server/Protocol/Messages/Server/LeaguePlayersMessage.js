const PiranhaMessage = require('../../PiranhaMessage')

class LeaguePlayersMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24503
    this.client = client
    this.version = 1
  }

  async encode () {
    let i = 1

    /*{
      if (i >= 51) {
        return
      }
      
      this.writeLong(this.client.player.highID, this.client.player.lowID)
      this.writeString(this.client.player.name) // Name
      this.writeInt(i)
      this.writeInt(this.client.player.trophies) // Trophies
      this.writeInt(i)
      this.writeInt(1) // Level
      this.writeInt(200)
      this.writeInt(i)
      this.writeInt(100)
      this.writeInt(1)
      this.writeLong(0, 1) // HighID, LowID
      this.writeInt(1)
      this.writeInt(1)
      //if (pl.AllianceId > 0)
      //{
      //    this.writeByte(1)
      //    this.writeLong(pl.AllianceId)
      //    Alliance _Alliance = ObjectManager.GetAlliance(pl.AllianceId)
      //    this.writeString(_Alliance.m_vAllianceName)
      //    this.writeInt(_Alliance.m_vAllianceBadgeData)
      //    this.writeLong(i)
      //}
      //else
          this.writeByte(0)

      i += 1
    }*/

    //this.writeInt(9000)
    //this.writeInt(1 - 0)
  }
}

module.exports = LeaguePlayersMessage