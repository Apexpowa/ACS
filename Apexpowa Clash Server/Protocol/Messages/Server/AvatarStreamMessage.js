const PiranhaMessage = require('../../PiranhaMessage')

class AvatarStreamMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 24411
    this.client = client
    this.version = 1
  }

  async encode () {
    /*
    Defence = 2
    JoinRefused = 3
    Invitation = 4
    RemovedClan = 5
    ClanMail = 6
    Attack = 7
    */

    this.writeInt(6) // Count

    {
      this.writeString('Hello!') // Message
      this.writeByte(1) // BOOM
      this.writeLong(0, 1) // SenderHighID, SenderLowID
      this.writeLong(0, 1) // AllianceHighID, AllianceLowID
      this.writeString('Clashers') // AllianceName
      this.writeInt(13000000) // AllianceBadge
    }
  }
}

module.exports = AvatarStreamMessage