class LogicTrainUnitCommand {
  async decode (self) {
    this.data = {}

    this.data.Unknown1 = self.readInt()
    this.data.IsSpell = self.readInt()
    this.data.UnitID = self.readInt()
    this.data.Count = self.readInt()
    this.data.Unknown2 = self.readInt()

    //console.log(this.data)
  }

  async process (self) {}
}

module.exports = LogicTrainUnitCommand