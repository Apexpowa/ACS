const PiranhaMessage = require('../../PiranhaMessage')

class AllianceListMessage extends PiranhaMessage {
  constructor (client, searchString) {
    super()
    this.id = 24310
    this.client = client
    this.version = 1
    this.searchString = searchString
  }

  async encode () {
    let count = 1

    this.writeString(this.searchString)
    this.writeInt(count)

    {
      this.writeLong(0, 1) // HighID, LowID
      this.writeString('Clashers') // Name
      this.writeInt(13000000) // Badge
      this.writeInt(1) // Type
      this.writeInt(count) // MemberCount
      this.writeInt(3200) // Score
      this.writeInt(0) // RequiredScore
      this.writeInt(0) // WonWars
      this.writeInt(0) // LostWars
      this.writeInt(0) // DrawWars
      this.writeInt(0x001E8481) // 
      this.writeInt(0) // WarFrequency
      this.writeInt(0) // AllianceOrigin
      this.writeInt(0) // AllianceExperience
      this.writeInt(1) // AllianceLevel
    }
  }
}

module.exports = AllianceListMessage