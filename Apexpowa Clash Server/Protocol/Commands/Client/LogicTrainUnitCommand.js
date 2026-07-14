const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicTrainUnitCommand {
  async decode (self) {
    this.data = {}

    self.readInt()
    this.data.IsSpell = self.readInt()
    this.data.UnitID = self.readInt()
    this.data.Count = self.readInt()
    self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    // TODO: Training time, for now it will instantly train
    const player = self.client.player
    if (this.data.IsSpell === 0) { // troops
      if (!player.army) player.army = []

      const existingUnit = player.army.find(u => u.unitID === this.data.UnitID)
      if (existingUnit) {
        existingUnit.count = (existingUnit.count || 0) + this.data.Count
      } else {
        player.army.push({
          unitID: this.data.UnitID,
          count: this.data.Count
        })
      }

      player.markModified('army')
      await player.save()
    } else if (this.data.IsSpell === 1) { // spells
      if (!player.spells) player.spells = []

      const existingUnit = player.spells.find(u => u.unitID === this.data.UnitID)
      if (existingUnit) {
        existingUnit.count = (existingUnit.count || 0) + this.data.Count
      } else {
        player.spells.push({
          unitID: this.data.UnitID,
          count: this.data.Count
        })
      }

      player.markModified('spells')
      await player.save()
    }
  }
}

module.exports = LogicTrainUnitCommand