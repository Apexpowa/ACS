const PiranhaMessage = require('../../PiranhaMessage')
const AllianceStreamMessage = require('../Server/AllianceStreamMessage')

class AskForAllianceStreamMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14314
    this.version = 1
  }

  async decode () {}

  async process () {
    const player = this.client.player
    if (!player.inClan) return

    try {
      await new AllianceStreamMessage(this.client, player.clan.ClanHighID, player.clan.ClanLowID).send()
    } catch (e) { console.error(e) }
  }
}

module.exports = AskForAllianceStreamMessage
