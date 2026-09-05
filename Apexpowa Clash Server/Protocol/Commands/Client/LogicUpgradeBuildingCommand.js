const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')
const Utils = require('../../../Utilities/Utils')

class LogicUpgradeBuildingCommand {
  async decode(self) {
    this.data = {}

    this.data.BuildingID = self.readInt()
    this.data.UpgradeWithMana = self.readInt()

    //console.log(this.data)
  }

  async process(self) {
    // TODO: Building time, for now it will instantly build
    let village = JSON.parse(self.client.player.village)
    const classID = Utils.getClassID(this.data.BuildingID)
    const instanceID = Utils.getInstanceID(this.data.BuildingID)
    const building = village.buildings[instanceID]
    if (!building) return

    building.lvl = (building.lvl || 0) + 1

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    await self.client.player.save()
  }
}

module.exports = LogicUpgradeBuildingCommand