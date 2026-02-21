const PiranhaMessage = require('../../PiranhaMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')
const LoginOkMessage = require('../Server/LoginOkMessage')
const OwnHomeDataMessage = require('../Server/OwnHomeDataMessage')
const AvatarStreamMessage = require('../Server/AvatarStreamMessage')
const AllianceFullEntryMessage = require('../Server/AllianceFullEntryMessage')
const WarMapMessage = require('../Server/WarMapMessage')
const AllianceAllEntryMessage = require('../Server/AllianceAllEntryMessage')

class LoginMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10101
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.HighID = this.readInt()
    this.data.LowID = this.readInt()
    this.data.Token = this.readString()
    this.data.Major = this.readInt()
    this.data.Build = this.readInt()
    this.data.Content = this.readInt()

    //console.log(this.data)
  }

  async process () {
    this.client.userObject = Object.assign({}, {
      highID: this.data.HighID,
      lowID: this.data.LowID,
      token: this.data.Token
    })
    this.client.mongoose.getPlayer(this.client, async (err, player) => {
      this.client.player = player
      await new LoginOkMessage(this.client).send()
      await new OwnHomeDataMessage(this.client).send()
      await new AvatarStreamMessage(this.client).send()

      if (this.client.player.inClan === 1) {
        await new AllianceFullEntryMessage(this.client).send()
        //await new WarMapMessage(this.client).send()
        await new AllianceAllEntryMessage(this.client).send()
      }
    })
  }
}

module.exports = LoginMessage