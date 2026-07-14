class LogicCastSpellCommand {
  async decode (self) {
    this.data = {}

    this.data.SpellX = self.readInt()
    this.data.SpellY = self.readInt()
    this.data.SpellID = self.readInt()
    this.data.Unknown = self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    const player = self.client.player
    if (!player.spells) player.spells = []

    const spellIndex = player.spells.findIndex(u => u.spellID === this.data.SpellID)
    if (spellIndex !== -1) {
      const spell = player.spells[spellIndex]
      spell.count -= 1
      if (spell.count <= 0) player.spells.splice(spellIndex, 1)
      player.markModified('spells')
      await player.save()
    }
  }
}

module.exports = LogicCastSpellCommand