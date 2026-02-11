class LogicCastSpellCommand {
  async decode (self) {
    this.data = {}

    this.data.SpellX = self.readInt()
    this.data.SpellY = self.readInt()
    this.data.SpellID = self.readInt()
    this.data.Unknown = self.readInt()

    console.log(this.data)
  }

  async process (self) {
    self.client.log('Placed spell!')
  }
}

module.exports = LogicCastSpellCommand