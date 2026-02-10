const PiranhaMessage = require('../../PiranhaMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')
const LoginOkMessage = require('../Server/LoginOkMessage')
const OwnHomeDataMessage = require('../Server/OwnHomeDataMessage')

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
    })
  }
}

module.exports = LoginMessage