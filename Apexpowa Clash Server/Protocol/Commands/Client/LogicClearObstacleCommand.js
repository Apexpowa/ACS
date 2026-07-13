const Utils = require('../../../Utilities/Utils')

class LogicClearObstacleCommand {
  async decode (self) {
    this.data = {}

    this.data.ObstacleID = self.readInt()
    this.data.Unknown = self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    // TODO: Clear obstacle time, for now it will instantly clear

    let village = JSON.parse(self.client.player.village)
    if (!Array.isArray(village.obstacles)) village.obstacles = []
    const classID = Utils.getClassID(this.data.ObstacleID)
    const instanceID = Utils.getInstanceID(this.data.ObstacleID)
    if (classID !== 503) {
      console.log('Not a obstacle')
      return
    }

    const obstacle = village.obstacles[instanceID]
    if (!obstacle) return
    village.obstacles.splice(instanceID, 1) // remove

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    self.client.player.save()
  }
}

module.exports = LogicClearObstacleCommand