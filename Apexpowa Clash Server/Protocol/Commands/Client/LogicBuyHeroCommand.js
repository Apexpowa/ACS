const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicBuyHeroCommand {
  async decode (self) {
    this.data = {}

    this.data.BuildingID = self.readInt()
    this.data.Unknown = self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    // TODO: Finish upgrade
    
    //await new AvailableServerCommandMessage(this.client).send()
  }
}

module.exports = LogicBuyHeroCommand