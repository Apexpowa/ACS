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
    self.client.log('Placed troop!')
  }
}

module.exports = LogicPlaceAttackerCommand