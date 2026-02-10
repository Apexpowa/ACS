const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicUnlockBuildingCommand {
  async decode(self) {
    this.data = {}

    this.data.BuildingID = self.readInt()
    this.data.Unknown = self.readInt()

    console.log(this.data)
  }

  async process(self) {
    let village = self.client.player.village
    village = JSON.parse(village)

    village.buildings.forEach(b => {
      if (this.data.BuildingID === 500000004) { // Broken Clan Castle
        if (b.data === 1000014) {
          b.locked = false
          self.client.log(`Unlocked building at x${b.x}, y${b.y}`)
        }
      }
    })

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    await self.client.player.save()
  }
}

module.exports = LogicUnlockBuildingCommand