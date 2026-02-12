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
    const x = this.data.PositionX
    const y = this.data.PositionY

    let building = village.buildings.find(b => b.id === id || b.data === id)
    if (building) {
      building.x = x
      building.y = y
      self.client.player.village = JSON.stringify(village)
      self.client.player.markModified('village')
      await self.client.player.save()
    }

    let deco = village.decos.find(d => d.id === id || d.data === id)
    if (deco) {
      deco.x = x
      deco.y = y
      self.client.player.village = JSON.stringify(village)
      self.client.player.markModified('village')
      await self.client.player.save()
    }

    let trap = village.traps.find(t => t.id === id || t.data === id)
    if (trap) {
      trap.x = x
      trap.y = y
      self.client.player.village = JSON.stringify(village)
      self.client.player.markModified('village')
      await self.client.player.save()
    }
  }
}

module.exports = LogicMoveBuildingCommand