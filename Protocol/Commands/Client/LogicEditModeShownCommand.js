const OutOfSyncMessage = require('../../Messages/Server/OutOfSyncMessage')

class LogicEditModeShownCommand {
  async decode (self) {}

  async process (self) {
    await new OutOfSyncMessage(self.client).send()
  }
}

module.exports = LogicEditModeShownCommand