const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')
const ServerErrorMessage = require('../Server/ServerErrorMessage')

class JoinAllianceMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14305
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.ClanHighID = this.readLong()[0]
    this.data.ClanLowID = this.readLong()[1]

    //console.log(this.data)
  }

  async process () {
    const player = this.client.player
    const db = this.client.mongoose

    if (player.inClan) {
      await new OutOfSyncMessage(this.client).send() // Already in a clan
      return
    }

    try {
      const clan = await db.getClanByID(this.data.ClanHighID, this.data.ClanLowID)
      
      if (!clan) {
        await new ServerErrorMessage(this.client, "Clan not found.").send()
        return
      }

      await db.joinClan(player, clan)
      await new AvailableServerCommandMessage(this.client, 1).send()
    } catch (e) {
      await new ServerErrorMessage(this.client, e.message || "Failed to join clan.").send()
      console.error(e)
    }
  }
}

module.exports = JoinAllianceMessage