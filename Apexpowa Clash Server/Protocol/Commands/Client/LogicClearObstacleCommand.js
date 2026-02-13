class LogicClearObstacleCommand {
  async decode (self) {
    this.data = {}

    this.data.ObstacleID = self.readInt()
    this.data.Unknown = self.readInt()

    //console.log(this.data)
  }

  async process (self) {}
}

module.exports = LogicClearObstacleCommand