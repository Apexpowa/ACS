const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicStartUnlockingBuildingCommand {
  async decode (self) {
    this.data = {}

    this.data.PositionX = self.readInt()
    this.data.PositionY = self.readInt()
    this.data.BuildingID = self.readInt()
    this.data.Unknown = self.readInt()

    console.log(this.data)
  }

  async process (self) {
    let village = self.client.player.village

    village = JSON.parse(village)

    if (!Array.isArray(village.building)) {
      village.building = []
    }

    const building = {
      data: this.data.BuildingID,
      x: this.data.PositionX,
      y: this.data.PositionY
    }
    village.decos.push(building)

    self.client.log(`Placed building ${building.data} at x${building.x}, y${building.y}`)

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    await self.client.player.save()
  }
}

module.exports = LogicStartUnlockingBuildingCommand