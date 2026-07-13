const Utils = require('../../../Utilities/Utils')

class LogicMoveMultipleBuildingsCommand {
  async decode (self) {
    this.data = {}
    
    this.data.Objects = []
    this.data.Count = self.readInt()
    for (let i = 0; i < this.data.Count; i++) this.data.Objects.push({x: self.readInt(), y: self.readInt(), id: self.readInt()})
    self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    let village = JSON.parse(self.client.player.village)
    if (!Array.isArray(village.buildings)) village.buildings = []
    if (!Array.isArray(village.decos)) village.decos = []
    if (!Array.isArray(village.traps)) village.traps = []

    for (const obj of this.data.Objects) {
      const instanceID = Utils.getInstanceID(obj.id)
      let found = false

      const building = village.buildings[instanceID]
      if (building) {
        building.x = obj.x
        building.y = obj.y
        found = true
        continue
      }
      const deco = village.decos[instanceID]
      if (deco) {
        deco.x = obj.x
        deco.y = obj.y
        found = true
        continue
      }
      const trap = village.traps[instanceID]
      if (trap) {
        trap.x = obj.x
        trap.y = obj.y
        found = true
        continue
      }

      if (!found) console.log(obj.id, ' not found.')
    }

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    self.client.player.save()
  }
}

module.exports = LogicMoveMultipleBuildingsCommand