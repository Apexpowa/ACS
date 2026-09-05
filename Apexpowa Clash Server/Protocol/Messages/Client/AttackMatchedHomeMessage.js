const PiranhaMessage = require('../../PiranhaMessage')
const EnemyHomeDataMessage = require('../../Messages/Server/EnemyHomeDataMessage')

class AttackMatchedHomeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14123
    this.version = 10
  }

  async decode () {}

  async process () {
    await new Promise(resolve => {
      this.client.mongoose.getRandomPlayer(
        this.client.player.lowID,
        (err, enemy) => {
          if (!enemy) {
            console.log("No enemies found!")
            resolve()
            return
          }

          new EnemyHomeDataMessage(this.client, enemy).send()

          resolve()
        }
      )
    })
  }
}

module.exports = AttackMatchedHomeMessage