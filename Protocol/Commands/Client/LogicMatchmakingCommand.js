const EnemyHomeDataMessage = require('../../Messages/Server/EnemyHomeDataMessage')

class LogicMatchmakingCommand {
  async decode (self) {}

  async process (self) {
    await new EnemyHomeDataMessage(self.client).send()
  }
}

module.exports = LogicMatchmakingCommand