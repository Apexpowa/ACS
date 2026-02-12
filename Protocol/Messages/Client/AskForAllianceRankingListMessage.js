const PiranhaMessage = require('../../PiranhaMessage')
const AllianceRankingListMessage = require('../Server/AllianceRankingListMessage')

class AskForAllianceRankingListMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14401
    this.version = 1
  }

  async decode () {}

  async process () {
    await new AllianceRankingListMessage(this.client).send()
  }
}

module.exports = AskForAllianceRankingListMessage