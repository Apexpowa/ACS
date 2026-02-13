const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicStartUnlockingBuildingCommand {
  async decode (self) {
    this.data = {}

    this.data.PositionX = self.readInt()
    this.data.PositionY = self.readInt()
    this.data.BuildingID = self.readInt()
    this.data.Unknown = self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    let village = self.client.player.village

    village = JSON.parse(village)

    if (!Array.isArray(village.buildings)) {
      village.buildings = []
    }

    const building = {
      data: this.data.BuildingID,
      lvl: 0,
      x: this.data.PositionX,
      y: this.data.PositionY
    }
    village.buildings.push(building)

    self.client.log(`Placed building ${building.data} at x${building.x}, y${building.y}`)

    if (this.data.BuildingID === 1000022) {
      if (self.client.player.heroes === 0) {
        self.client.player.heroes = 1
        self.client.player.markModified('heroes')
      }
    }
    else if (this.data.BuildingID === 1000025) {
      if (self.client.player.heroes === 1) {
        self.client.player.heroes = 2
        self.client.player.markModified('heroes')
      }
    }

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    await self.client.player.save()
  }
}

module.exports = LogicStartUnlockingBuildingCommand