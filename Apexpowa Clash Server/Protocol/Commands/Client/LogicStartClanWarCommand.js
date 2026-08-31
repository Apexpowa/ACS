const AllianceWarMapDataMessage = require('../../Messages/Server/AllianceWarMapDataMessage')
const AllianceStreamEntryMessage = require('../../Messages/Server/AllianceStreamEntryMessage')

class LogicStartClanWarCommand {
  async decode (self) {
    this.data = {}

    this.data.Tick = self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    await new AllianceWarMapDataMessage(self.client).send()
  }
}

module.exports = LogicStartClanWarCommand