class LogicPlaceAttackerCommand {
  async decode (self) {
    this.data = {}

    this.data.TroopX = self.readInt()
    this.data.TroopY = self.readInt()
    this.data.UnitID = self.readInt()
    this.data.Unknown = self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    const player = self.client.player
    if (!player.army) player.army = []

    const unitIndex = player.army.findIndex(u => u.unitID === this.data.UnitID)
    if (unitIndex !== -1) {
      const unit = player.army[unitIndex]
      unit.count -= 1
      if (unit.count <= 0) player.army.splice(unitIndex, 1)
      player.markModified('army')
      await player.save()
    }
  }
}

module.exports = LogicPlaceAttackerCommand