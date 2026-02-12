class LogicMoveMultipleBuildingsCommand {
  async decode (self) {
    this.data = {}
    this.data.Objects = []

    this.data.Count = self.readInt()

    for (let i = 0; i < this.data.Count; i++) {
      this.data.Objects.push({
        x: self.readInt(),
        y: self.readInt(),
        id: self.readInt()
      })
    }

    this.data.Unknown = self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    let village = JSON.parse(self.client.player.village)

    if (!Array.isArray(village.buildings)) village.buildings = []
    if (!Array.isArray(village.decos)) village.decos = []
    if (!Array.isArray(village.traps)) village.traps = []

    for (const obj of this.data.Objects) {
      let found = false

      const building = village.buildings.find(b => b.id === obj.id || b.data === obj.id)
      if (building) {
        building.x = obj.x
        building.y = obj.y
        found = true
        continue
      }

      const deco = village.decos.find(d => d.id === obj.id || d.data === obj.id)
      if (deco) {
        deco.x = obj.x
        deco.y = obj.y
        found = true
        continue
      }

      const trap = village.traps.find(t => t.id === obj.id || t.data === obj.id)
      if (trap) {
        trap.x = obj.x
        trap.y = obj.y
        found = true
        continue
      }

      if (!found) {
        return
      }
    }

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    await self.client.player.save()
  }
}

module.exports = LogicMoveMultipleBuildingsCommand