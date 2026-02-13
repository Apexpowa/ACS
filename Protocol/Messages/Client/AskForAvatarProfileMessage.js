const PiranhaMessage = require('../../PiranhaMessage')
const AvatarProfileMessage = require('../Server/AvatarProfileMessage')

class AskForAvatarProfileMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14325
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.AvatarHighID = this.readInt()
    this.data.AvatarLowID = this.readInt()

    this.data.AllianceHighID = this.readInt()
    this.data.AllianceLowID = this.readInt()

    this.data.Unknown = this.readInt()

    this.data.HomeHighID = this.readInt()
    this.data.HomeLowID = this.readInt()

    //console.log(this.data)
  }

  async process () {
    await new Promise(resolve => {
      this.client.mongoose.getSpecificPlayer(
        0,
        this.data.AvatarLowID,
        (err, plr) => {
          if (!plr) {
            console.log("Player not found!")
            resolve()
            return
          }

          new AvatarProfileMessage(this.client, plr).send()

          resolve()
        }
      )
    })
  }
}

module.exports = AskForAvatarProfileMessage