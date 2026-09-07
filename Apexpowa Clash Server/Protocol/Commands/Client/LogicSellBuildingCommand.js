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
    switch (classID) {
      case 500: // Building
        const building = village.buildings[instanceID]
        if (!building) return
        village.buildings.splice(instanceID, 1) // remove

        self.client.player.village = JSON.stringify(village)
        self.client.player.markModified('village')
        await self.client.player.save()
        break
      case 504: // Trap
        const trap = village.traps[instanceID]
        if (!trap) return
        village.traps.splice(instanceID, 1) // remove

        self.client.player.village = JSON.stringify(village)
        self.client.player.markModified('village')
        await self.client.player.save()
        break
      case 506: // Deco
        const deco = village.decos[instanceID]
        if (!deco) return
        village.decos.splice(instanceID, 1) // remove

        self.client.player.village = JSON.stringify(village)
        self.client.player.markModified('village')
        await self.client.player.save()
        break
      default:
        console.log('Not a deco or building, cannot sell with classID: ' + classID)
        return
    }
  }
}

module.exports = LogicSellBuildingCommand