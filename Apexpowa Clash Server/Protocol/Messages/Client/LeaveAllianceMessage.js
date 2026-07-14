const PiranhaMessage = require('../../PiranhaMessage')
const LeaveAllianceOkMessage = require('../Server/LeaveAllianceOkMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')

class LeaveAllianceMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14308
    this.version = 1
  }

  async decode () {}

  async process () {
    const player = this.client.player
    const db = this.client.mongoose

    if (!player.inClan) {
      await new OutOfSyncMessage(this.client).send() // Not in a clan
      return
    }

    try {
      await db.leaveClan(player)
      await new LeaveAllianceOkMessage(this.client).send()
    } catch (e) {
      console.error(e)
      await new OutOfSyncMessage(this.client).send()
    }
  }
}

module.exports = LeaveAllianceMessage