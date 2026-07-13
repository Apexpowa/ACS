const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')
const Utils = require('../../../Utilities/Utils')

class LogicSellBuildingCommand {
  async decode(self) {
    this.data = {}

    this.data.BuildingID = self.readInt()
    self.readInt()

    // console.log(this.data)
  }

  async process(self) {
    // this is now only for selling decos

    let village = JSON.parse(self.client.player.village)
    if (!Array.isArray(village.decos)) village.decos = []
    const classID = Utils.getClassID(this.data.BuildingID)
    const instanceID = Utils.getInstanceID(this.data.BuildingID)
    if (classID !== 506) {
      console.log('Not a deco')
      return
    }

    const deco = village.decos[instanceID]
    if (!deco) return
    village.decos.splice(instanceID, 1) // remove

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    self.client.player.save()
  }
}

module.exports = LogicSellBuildingCommand