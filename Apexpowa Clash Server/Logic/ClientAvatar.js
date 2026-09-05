const LogicBase = require('./LogicBase')

class ClientAvatar {
  async encode (self, player) {
    new LogicBase().encode(self)

    self.writeLong(player.highID, player.lowID) // HighID, LowID
    self.writeLong(player.highID, player.lowID) // HighID, LowID
    
    self.writeByte(player.inClan) // IsInAlliance
    if (player.inClan === 1) {
      let clan = null
      if (self.client && self.client.mongoose && typeof self.client.mongoose.getClanByID === 'function') {
        try {
          clan = await self.client.mongoose.getClanByID(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID)
        } catch (e) {
          console.error(e)
          clan = null
        }
      }
      
      self.writeLong(player.clan.ClanHighID, player.clan.ClanLowID) // HighID, LowID
      self.writeString(clan ? String(clan.name || '') : '') // AllianceName
      self.writeInt(clan.badge) // AllianceBadge
      self.writeInt(player.clan.ClanRole) // AllianceRole (0-1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader)
    }

    self.writeInt(player.league) // League

    let village = player.village
    village = JSON.parse(village)
    village.buildings.forEach(b => {
      if (b.data === 1000014) {
        self.writeInt(b.lvl) // AllianceCastleLevel
      }
    })
    self.writeInt(10) // AllianceCastleTotalCapacity
    self.writeInt(0) // AllianceCastleUsedCapacity
    self.writeString(player.name) // Name
    self.writeString(player.facebookID) // FacebookID
    self.writeInt(player.level) // Level
    self.writeInt(player.xpPoints) // Experience
    self.writeInt(player.diamonds) // Diamonds
    self.writeInt(player.diamonds) // FreeDiamonds
    self.writeInt(player.attackRating) // AttackRating
    self.writeInt(player.attackKFactor) // AttackKFactor
    self.writeInt(player.trophies) // Score

    self.writeBoolean(player.nameChangesCount > 1 ? 1 : 0) // nameChangesCount
    self.writeInt(player.cumulativePurchasedDiamonds) // CumulativePurchasedDiamonds

    // LogicDataSlotArrays
    self.writeInt(0)
    self.writeInt(2) // ResourceSlotData
    {
      // Gold
      self.writeInt(3000001)
      self.writeInt(1000000000)
      // Elixir
      self.writeInt(3000002)
      self.writeInt(1000000000)
    }
    self.writeInt(player.army ? player.army.length : 0) //array 3, unit slot data
    {
      if (player.army && player.army.length > 0) {
        player.army.forEach(unit => {
          self.writeInt(unit.unitID) // UnitID
          self.writeInt(unit.count) // UnitCount
        })
      }
    }
    self.writeInt(player.spells ? player.spells.length : 0) //array 4, spell slot data
    {
      if (player.spells && player.spells.length > 0) {
        player.spells.forEach(spell => {
          self.writeInt(spell.unitID) // SpellID
          self.writeInt(spell.count) // SpellCount
        })
      }
    }
    self.writeInt(0) //array 5, unit upgrade slot
    self.writeInt(0) //array 6, spell upgrade slot
    self.writeInt(0) //array 10, alliance unit data
    if (player.tutorialSteps != 35) {
      player.tutorialSteps = 10
    }
    player.nameChangesCount == 0 ? player.nameChangesCount : 35
    self.writeInt(player.tutorialSteps) //array 11, tutorial steps data
    {
      for (let i = 0; i < player.tutorialSteps; i++) {
        self.writeInt(21000000 + i)
      }
    }
    self.writeInt(0) //array 12, achievement rewards data
    self.writeInt(0) //array 13, achievement progress data
    self.writeInt(50) //array 14, npc map progress data
    {
      for (let i = 17000000; i < 17000050; i++) {
        self.writeInt(i)
        self.writeInt(3)
      }
    }
    self.writeInt(0) //array 15, npc looted gold data
    self.writeInt(0) //array 16, npc looted elixir data
  }
}

module.exports = ClientAvatar
