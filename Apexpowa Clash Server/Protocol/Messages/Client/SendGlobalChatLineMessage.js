const PiranhaMessage = require('../../PiranhaMessage')
const GlobalChatLineMessage = require('../Server/GlobalChatLineMessage')
const VisitedHomeDataMessage = require('../Server/VisitedHomeDataMessage')

class SendGlobalChatLineMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14715
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.Message = this.readString()

    //console.log(this.data)
  }

  async process () {
    if (this.data.Message?.startsWith('/')) {
      const args = this.data.Message.slice(1).trim().split(/\s+/)
      const command = args.shift()?.toLowerCase()
      const player = this.client.player

      switch (command) {
        case 'visit': {
          const id = parseInt(args[0], 10)

          console.log(id)

          if (isNaN(id)) {
            break
          }

          await new Promise(resolve => {
            this.client.mongoose.getSpecificPlayer(
              0,
              id,
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
          
          break
        }
      }
    }
    else {
      await new GlobalChatLineMessage(this.client, this.data.Message).send()
    }
  }
}

module.exports = SendGlobalChatLineMessage