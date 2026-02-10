const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicUpgradeBuildingCommand {
  async decode(self) {
    this.data = {}

    this.data.BuildingID = self.readInt()
    this.data.UpgradeWithMana = self.readInt()
    this.data.Unknown = self.readInt()

    console.log(this.data)
  }

  async process(self) {
    let village = self.client.player.village
    village = JSON.parse(village)

    const building = village.buildings.find(b => b.data === this.data.BuildingID)
    building.lvl = (building.lvl || 0) + 1

    self.client.log(`Upgraded building ${building.data} to lvl ${building.lvl}`)

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    await self.client.player.save()
  }
}

module.exports = LogicUpgradeBuildingCommand