const PiranhaMessage = require('../../PiranhaMessage')
const AvatarRankingListMessage = require('../Server/AvatarRankingListMessage')

class AskForAvatarRankingListMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14403
    this.version = 1
  }

  async decode () {}

  async process () {
    await new AvatarRankingListMessage(this.client).send()
  }
}

module.exports = AskForAvatarRankingListMessage