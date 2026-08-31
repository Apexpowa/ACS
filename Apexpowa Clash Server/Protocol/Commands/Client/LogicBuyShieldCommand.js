const ShieldData = {
  20000000: { TimeH: 24, Diamonds: 100 },
  20000001: { TimeH: 48, Diamonds: 250 },
  20000002: { TimeH: 168, Diamonds: 500 }
}

class LogicBuyShieldCommand {
  async decode (self) {
    this.data = {}

    this.data.ShieldId = self.readInt()
    self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    const shield = ShieldData[this.data.ShieldId]
    if (!shield) return

    const now = Date.now()
    const time = (self.client.player.shieldDurationSeconds && self.client.player.shieldDurationSeconds > now) ? self.client.player.shieldDurationSeconds : now
    self.client.player.shieldDurationSeconds = time + shield.TimeH * 3600 * 1000
    self.client.player.diamonds -= shield.Diamonds

    self.client.player.markModified('shieldDurationSeconds')
    self.client.player.markModified('diamonds')
    await self.client.player.save()
  }
}

module.exports = LogicBuyShieldCommand