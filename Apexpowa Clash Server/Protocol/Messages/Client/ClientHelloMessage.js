const PiranhaMessage = require('../../PiranhaMessage')
const ServerHelloMessage = require('../Server/ServerHelloMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')

const config = require('../../../config.json')

class ClientHelloMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10100
    this.version = 0
  }

  async decode () {
    this.data = {}
    
    this.data.Protocol = this.readVInt()
    this.data.Key = this.readVInt()
    this.data.Major = this.readVInt()
    this.data.Minor = this.readVInt()
    this.data.Build = this.readVInt()

    console.log(this.data)
  }

  async process () {
    if (this.data.Major !== parseInt(config.Server.Version.split('.')[0]) || this.data.Build !== parseInt(config.Server.Version.split('.')[1])) {
      await new LoginFailedMessage(this.client, 3, `Your version doesn't match the server version.\n Client Version: ${this.data.Major}.${this.data.Build}\n Server Version: ${config.Server.Version} \n\n We've also detected that your client is using the wrong cryptography!`).send()
      return
    }

    await new LoginFailedMessage(this.client, 3, `We've detected that your client is using the wrong cryptography!`).send()
    return

    await new ServerHelloMessage(this.client).send()
  }
}

module.exports = ClientHelloMessage
