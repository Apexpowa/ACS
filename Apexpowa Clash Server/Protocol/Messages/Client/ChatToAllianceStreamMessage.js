const PiranhaMessage = require('../../PiranhaMessage')
const AllianceStreamEntryMessage = require('../Server/AllianceStreamEntryMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')

class ChatToAllianceStreamMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14315
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Message = this.readString()

    //console.log(this.data)
  }

  async process () {
    const player = this.client.player
    const db = this.client.mongoose

    if (!player.inClan) {
      await new OutOfSyncMessage(this.client).send() // Not in a clan
      return
    }

    try {
      const clan = await db.getClanByID(player.clan.ClanHighID, player.clan.ClanLowID)
      if (!clan) {
        await new OutOfSyncMessage(this.client).send()
        return
      }

      if (!clan.messages) clan.messages = []
      const maxId = clan.messages.length > 0 
        ? Math.max(...clan.messages.map(m => m.id || 0))
        : 0
      const messageId = maxId + 1

      const chatMessage = {
        id: messageId,
        senderHighID: player.highID,
        senderLowID: player.lowID,
        senderName: player.name,
        senderRole: player.clan.ClanRole,
        message: this.data.Message,
        timestamp: new Date()
      }
      clan.messages.push(chatMessage)
      clan.markModified('messages')
      await clan.save()

      await new AllianceStreamEntryMessage(this.client, chatMessage).send()
    } catch (e) {
      console.error(e)
      await new OutOfSyncMessage(this.client).send()
    }
  }
}

module.exports = ChatToAllianceStreamMessage