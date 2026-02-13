const EnemyHomeDataMessage = require('../../Messages/Server/EnemyHomeDataMessage')

class LogicMatchmakingCommand {
  async decode (self) {}

  async process (self) {
    await new Promise(resolve => {
      self.client.mongoose.getRandomPlayer(
        self.client.player.lowID,
        (err, enemy) => {
          if (!enemy) {
            console.log("No enemies found!")
            resolve()
            return
          }

          new EnemyHomeDataMessage(self.client, enemy).send()

          resolve()
        }
      )
    })
  }
}

module.exports = LogicMatchmakingCommand