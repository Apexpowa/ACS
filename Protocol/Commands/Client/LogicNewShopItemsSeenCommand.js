class LogicNewShopItemsSeenCommand {
  async decode (self) {
    this.data = {}

    this.data.Unknown1 = self.readInt()
    this.data.Unknown2 = self.readInt()
    this.data.Unknown3 = self.readInt()
    this.data.Unknown4 = self.readInt()

    //console.log(this.data)
  }

  async process (self) {}
}

module.exports = LogicNewShopItemsSeenCommand