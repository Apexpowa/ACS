const Utils = require('../../../Utilities/Utils')

class LogicMoveBuildingCommand {
  async decode (self) {
    this.data = {}

    this.data.PositionX = self.readInt()
    this.data.PositionY = self.readInt()
    this.data.BuildingID = self.readInt()
    this.data.Unknown = self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    let village = JSON.parse(self.client.player.village)
    if (!Array.isArray(village.buildings)) village.buildings = []
    if (!Array.isArray(village.decos)) village.decos = []
    if (!Array.isArray(village.traps)) village.traps = []
    const id = this.data.BuildingID
    const instanceID = Utils.getInstanceID(id)
    const x = this.data.PositionX
    const y = this.data.PositionY
    let moved = false

    const building = village.buildings[instanceID]
    if (building) {
      building.x = x
      building.y = y
      moved = true
    }
    const deco = village.decos[instanceID]
    if (deco) {
      deco.x = x
      deco.y = y
      moved = true
    }
    const trap = village.traps[instanceID]
    if (trap) {
      trap.x = x
      trap.y = y
      moved = true
    }

    if (moved) {
      self.client.player.village = JSON.stringify(village)
      self.client.player.markModified('village')
      self.client.player.save()
    } else {
      console.log(id, ' not found.')
    }
  }
}

module.exports = LogicMoveBuildingCommand