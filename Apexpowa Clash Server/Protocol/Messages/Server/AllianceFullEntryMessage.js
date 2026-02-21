const PiranhaMessage = require('../../PiranhaMessage')

class AllianceFullEntryMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24324
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeString('Test alliance') // Description
    this.writeInt(0) // WarState

    this.writeInt(0) 

    this.writeByte(0) // BOOM
    //this.writeLong(0, 1) WarHighID, WarLowID

    this.writeByte(0) // BOOM
    this.writeInt(0)

    // Clan
    {
      this.writeLong(0, 1) // HighID, LowID
      this.writeString('Clashers') // Name

      this.writeInt(13000000) // Badge
      this.writeInt(0) // Type
      this.writeInt(1) // MemberCount

      this.writeInt(3200) // Trophies
      this.writeInt(0) // RequiredTrophies

      this.writeInt(0) // WonWar 
      this.writeInt(0) // LostWar
      this.writeInt(0) // DrawWar

      this.writeInt(2000001)
      this.writeInt(0) // WarFrequency
      this.writeInt(0) // Origin
      this.writeInt(0) // Experience
      this.writeInt(1) // Level

      this.writeInt(0)
      this.writeBoolean(false) // WarHistory
      this.writeInt(0)
      this.writeBoolean(false) // WarAmical
    }
  }
}

module.exports = AllianceFullEntryMessage