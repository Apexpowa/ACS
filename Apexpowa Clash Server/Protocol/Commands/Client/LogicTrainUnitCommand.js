const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicTrainUnitCommand {
  async decode (self) {
    this.data = {}

    self.readInt()
    this.data.UnitID = self.readInt()
    this.data.Count = self.readInt()

    console.log(this.data)
  }

  async process (self) {
    // TODO: Training time, for now it will instantly train
    const player = self.client.player
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
  }
}

module.exports = LogicTrainUnitCommand