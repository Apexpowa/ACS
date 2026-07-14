const PlayerManager = require('./PlayerManager')
const GlobalChatLineMessage = require('../Protocol/Messages/Server/GlobalChatLineMessage')

class GlobalChatManager {
  async process(entry) {
    for (const client of PlayerManager.getAll()) {
      if (!client.player) continue

      await new GlobalChatLineMessage(client, entry).send()
    }
  }
}

module.exports = new GlobalChatManager()