class ClientAvatar {
  async encode (self) {
    self.writeInt(0) // 6.253

    self.writeLong(self.client.player.highID, self.client.player.lowID) // HighID, LowID
    self.writeLong(self.client.player.highID, self.client.player.lowID) // HighID, LowID
    
    self.writeByte(self.client.player.inClan) // IsInAlliance
    if (self.client.player.inClan === 1) {
      self.writeLong(self.client.player.clan.ClanHighID, self.client.player.clan.ClanLowID) // HighID, LowID
      self.writeString('Clashers') // AllianceName
      self.writeInt(13000000) // AllianceBadge
      self.writeInt(4) // AllianceRole
      
      self.writeByte(0) // 6.253
    }

    self.writeInt(self.client.player.league) // League

    let village = self.client.player.village
    village = JSON.parse(village)
    village.buildings.forEach(b => {
      if (b.data === 1000014) {
        self.writeInt(b.data.lvl) // AllianceCastleLevel
      }
    })
    self.writeInt(10) // AllianceCastleTotalCapacity
    self.writeInt(0) // AllianceCastleUsedCapacity
    village.buildings.forEach(b => {
      if (b.data === 1000000) {
        self.writeInt(b.data.lvl) // TownhallLevel
      }
    })
    self.writeString(self.client.player.name) // Name
    self.writeString(self.client.player.facebookID) // FacebookID
    self.writeInt(self.client.player.level) // Level
    self.writeInt(self.client.player.xpPoints) // Experience
    self.writeInt(self.client.player.diamonds) // Diamonds
    self.writeInt(self.client.player.diamonds) // FreeDiamonds
    self.writeInt(self.client.player.attackRating) // AttackRating
    self.writeInt(self.client.player.attackKFactor) // AttackKFactor
    self.writeInt(self.client.player.trophies) // Score
    self.writeInt(self.client.player.attackWinCount) // AttackWinCount
    self.writeInt(self.client.player.attackLoseCount) // AttackLoseCount
    self.writeInt(self.client.player.defendWinCount) // DefendWinCount
    self.writeInt(self.client.player.defendLoseCount) // DefendLoseCount
    self.writeInt(self.client.player.allianceCastleGold) // AllianceCastleGold
    self.writeInt(self.client.player.allianceCastleMana) // AllianceCastleMana
    self.writeInt(self.client.player.allianceCastleDarkMana) // AllianceCastleDarkMana

    self.writeBoolean(self.client.player.nameChangesCount > 1 ? 1 : 0) // nameChangesCount
    self.writeInt(self.client.player.cumulativePurchasedDiamonds) // CumulativePurchasedDiamonds

    // Arrays
    self.writeInt(0) // array 1, resource cap data
    self.writeInt(3) // //array 2, resource data
    {
      self.writeInt(3000001) // Gold ID
      self.writeInt(self.client.player.gold) // Gold Count
      self.writeInt(3000002) // Elixir ID
      self.writeInt(self.client.player.mana) // Elixir Count
      self.writeInt(3000003) // Dark Elixir ID
      self.writeInt(self.client.player.darkMana) // Dark Elixir Count
    }
    self.writeInt(1) //array 3, unit slot data
    {
      self.writeInt(4000008) // ID
      self.writeInt(1) // Amount
    }
    self.writeInt(0) //array 4, spell slot data
    self.writeInt(0) //array 5, unit upgrade slot
    self.writeInt(0) //array 6, spell upgrade slot
    self.writeInt(self.client.player.heroes) //array 7, hero upgrade slot
    {
      if (self.client.player.heroes === 1) {
        village.buildings.forEach(b => {
          if (b.data === 1000022) { // BK
            self.writeInt(28000000) // ID
            self.writeInt(b.data.lvl) // Level
          }
        })
      }
      else if (self.client.player.heroes === 2) {
        village.buildings.forEach(b => {
          if (b.data === 1000022) { // BK
            self.writeInt(28000000) // ID
            self.writeInt(b.data.lvl) // Level
          }
        })
        village.buildings.forEach(b => {
          if (b.data === 1000025) { // Q
            self.writeInt(28000001) // ID
            self.writeInt(b.data.lvl) // Level
          }
        })
      }
    }
    self.writeInt(self.client.player.heroes) //array 8, hero health slot
    {
      if (self.client.player.heroes === 1) {
        village.buildings.forEach(b => {
          if (b.data === 1000022) { // BK
            self.writeInt(28000000) // ID
            self.writeInt(0)
          }
        })
      }
      else if (self.client.player.heroes === 2) {
        village.buildings.forEach(b => {
          if (b.data === 1000022) { // BK
            self.writeInt(28000000) // ID
            self.writeInt(0)
          }
        })
        village.buildings.forEach(b => {
          if (b.data === 1000025) { // AQ
            self.writeInt(28000001) // ID
            self.writeInt(0)
          }
        })
      }
    }
    self.writeInt(self.client.player.heroes) //array 9, hero state slot
    {
      if (self.client.player.heroes === 1) {
        village.buildings.forEach(b => {
          if (b.data === 1000022) { // BK
            self.writeInt(28000000) // ID
            self.writeInt(3) // 2 = Sleep, 3 = Guard
          }
        })
      }
      else if (self.client.player.heroes === 2) {
        village.buildings.forEach(b => {
          if (b.data === 1000022) { // BK
            self.writeInt(28000000) // ID
            self.writeInt(3) // 2 = Sleep, 3 = Guard
          }
        })
        village.buildings.forEach(b => {
          if (b.data === 1000025) { // AQ
            self.writeInt(28000001) // ID
            self.writeInt(3) // 2 = Sleep, 3 = Guard
          }
        })
      }
    }
    self.writeInt(0) //array 10, alliance unit data
    if (self.client.player.tutorialSteps != 35) {
      self.client.player.tutorialSteps = 10
    }
    self.client.player.nameChangesCount == 0 ? self.client.player.nameChangesCount : 35
    self.writeInt(self.client.player.tutorialSteps) //array 11, tutorial steps data
    {
      for (let i = 0; i < self.client.player.tutorialSteps; i++) {
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