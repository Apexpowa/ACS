class LogicBuyResourceCommand {
  async decode (self) {
    this.data = {}

    this.data.ResourceData = self.readInt()
    this.data.ResourceCount = self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    switch (this.data.ResourceData) {
      case 3000001:
        self.client.player.gold += this.data.ResourceCount
        self.client.player.markModified('gold')
        await self.client.player.save()
        break
      case 3000002:
        self.client.player.mana += this.data.ResourceCount
        self.client.player.markModified('mana')
        await self.client.player.save()
        break
      case 3000003:
        self.client.player.darkMana += this.data.ResourceCount
        self.client.player.markModified('darkMana')
        await self.client.player.save()
        break
    }
  }
}

module.exports = LogicBuyResourceCommand