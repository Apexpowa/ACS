const PiranhaMessage = require('../../PiranhaMessage')
const GlobalChatLineMessage = require('../Server/GlobalChatLineMessage')
const VisitedHomeDataMessage = require('../Server/VisitedHomeDataMessage')
const GlobalChatMessages = require('../../../Core/GlobalChatMessages')
const GlobalChatManager = require('../../../Core/GlobalChatManager')

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

      switch (command) {
        case 'visit': {
          const id = parseInt(args[0], 10)

          //console.log(id)

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
      const entry = {
        region: 'US',
        message: this.data.Message,
        name: this.client.player.name,
        level: this.client.player.level,
        highID: this.client.player.highID,
        lowID: this.client.player.lowID,
        inClan: this.client.player.inClan === 1,
        clan: this.client.player.clan,
        timestamp: Date.now()
      }
      GlobalChatMessages.add(entry)
      await GlobalChatManager.process(entry)
    }
  }
}

module.exports = SendGlobalChatLineMessage