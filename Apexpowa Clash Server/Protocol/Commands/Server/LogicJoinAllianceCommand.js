class LogicJoinAllianceCommand {
  async decode (self) {}

  async encode (self) {
    if (self.client.inClan === 0) {
      self.client.player.inClan = 1
      self.client.player.clan.ClanHighID = self.client.clan.highID
      self.client.player.clan.ClanLowID = self.client.clan.lowID
      self.client.player.markModified('inClan')
      self.client.player.markModified('clan.ClanHighID')
      self.client.player.markModified('clan.ClanLowID')

      self.writeLong(self.client.clan.highID, self.client.clan.lowID) // HighID, LowID
      self.writeString(self.client.clan.name) // Name
      self.writeInt(self.client.clan.badge) // Badge
      self.writeByte(0)
      self.writeInt(self.client.clan.level) // Level
      self.writeInt(1)
      self.writeInt(-1)

      await self.client.player.save()
    }
  }
}

module.exports = LogicJoinAllianceCommand