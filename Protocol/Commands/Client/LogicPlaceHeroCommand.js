class LogicPlaceHeroCommand {
  async decode (self) {
    this.data = {}

    this.data.PositionX = self.readInt()
    this.data.PositionY = self.readInt()
    this.data.HeroID = self.readInt()
    this.data.Unknown = self.readInt()

    //console.log(this.data)
  }

  async process (self) {}
}

module.exports = LogicPlaceHeroCommand