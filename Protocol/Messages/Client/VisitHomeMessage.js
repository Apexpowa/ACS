const PiranhaMessage = require('../../PiranhaMessage')
const VisitedHomeDataMessage = require('../Server/VisitedHomeDataMessage')

class VisitHomeMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14113
    this.version = 0
  }

  async decode () {
    this.data = {}

    this.data.LowID = this.readInt()

    console.log(this.data)
  }

  async process () {
    await new Promise(resolve => {
      this.client.mongoose.getSpecificPlayer(
        0,
        this.data.LowID,
        (err, plr) => {
          if (!plr) {
            console.log("Player not found!")
            resolve()
            return
          }

          new VisitedHomeDataMessage(this.client, plr).send()

          resolve()
        }
      )
    })
  }
}

module.exports = VisitHomeMessage