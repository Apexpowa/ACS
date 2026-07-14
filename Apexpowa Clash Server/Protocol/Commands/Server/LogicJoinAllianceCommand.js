class LogicJoinAllianceCommand {
  async decode (self) {}

  async encode (self) {
    const db = self.client.mongoose
    const clan = await db.getClanByID(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID)

    self.writeLong(clan.ClanHighID, clan.lowID) // HighID, LowID
    self.writeString(clan.name) // Name
    self.writeInt(clan.badge) // Badge
    self.writeByte(0)
    self.writeInt(clan.level) // Level
    self.writeInt(1)
    self.writeInt(-1)
  }
}

module.exports = LogicJoinAllianceCommand