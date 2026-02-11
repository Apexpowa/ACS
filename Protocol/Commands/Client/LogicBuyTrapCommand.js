const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicBuyTrapCommand {
  async decode(self) {
    this.data = {}

    this.data.PositionX = self.readInt()
    this.data.PositionY = self.readInt()
    this.data.TrapID = self.readInt()

    console.log(this.data)
  }

  async process(self) {
    let village = self.client.player.village

    village = JSON.parse(village)

    if (!Array.isArray(village.traps)) {
      village.traps = []
    }

    const trap = {
      data: this.data.TrapID,
      lvl: 0,
      x: this.data.PositionX,
      y: this.data.PositionY
    }
    village.traps.push(trap)

    self.client.log(`Placed trap ${trap.data} at x${trap.x}, y${trap.y}`)

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    await self.client.player.save()
  }
}

module.exports = LogicBuyTrapCommand