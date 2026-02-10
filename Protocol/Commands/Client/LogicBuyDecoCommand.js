const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicBuyDecoCommand {
  async decode(self) {
    this.data = {}

    this.data.PositionX = self.readInt()
    this.data.PositionY = self.readInt()
    this.data.DecorationID = self.readInt()

    console.log(this.data)
  }

  async process(self) {
    let village = self.client.player.village

    village = JSON.parse(village)

    if (!Array.isArray(village.decos)) {
      village.decos = []
    }

    const decoration = {
      data: this.data.DecorationID,
      x: this.data.PositionX,
      y: this.data.PositionY
    }
    village.decos.push(decoration)

    self.client.log(`Placed decoration ${decoration.data} at x${decoration.x}, y${decoration.y}`)

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    await self.client.player.save()
  }
}

module.exports = LogicBuyDecoCommand