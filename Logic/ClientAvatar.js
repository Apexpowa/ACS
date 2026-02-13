class ClientAvatar {
  async encode (self, player) {
    self.writeInt(0) // 6.253

    self.writeLong(player.highID, player.lowID) // HighID, LowID
    self.writeLong(player.highID, player.lowID) // HighID, LowID
    
    self.writeByte(player.inClan) // IsInAlliance
    if (player.inClan === 1) {
      self.writeLong(player.clan.ClanHighID, player.clan.ClanLowID) // HighID, LowID
      self.writeString('Clashers') // AllianceName
      self.writeInt(13000000) // AllianceBadge
      self.writeInt(4) // AllianceRole
      
      self.writeByte(0) // 6.253
    }

    self.writeInt(player.league) // League

    let village = player.village
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
    self.writeString(player.name) // Name
    self.writeString(player.facebookID) // FacebookID
    self.writeInt(player.level) // Level
    self.writeInt(player.xpPoints) // Experience
    self.writeInt(player.diamonds) // Diamonds
    self.writeInt(player.diamonds) // FreeDiamonds
    self.writeInt(player.attackRating) // AttackRating
    self.writeInt(player.attackKFactor) // AttackKFactor
    self.writeInt(player.trophies) // Score
    self.writeInt(player.attackWinCount) // AttackWinCount
    self.writeInt(player.attackLoseCount) // AttackLoseCount
    self.writeInt(player.defendWinCount) // DefendWinCount
    self.writeInt(player.defendLoseCount) // DefendLoseCount
    self.writeInt(player.allianceCastleGold) // AllianceCastleGold
    self.writeInt(player.allianceCastleMana) // AllianceCastleMana
    self.writeInt(player.allianceCastleDarkMana) // AllianceCastleDarkMana

    self.writeBoolean(player.nameChangesCount > 1 ? 1 : 0) // nameChangesCount
    self.writeInt(player.cumulativePurchasedDiamonds) // CumulativePurchasedDiamonds

    // Arrays
    self.writeInt(0) // array 1, resource cap data
    self.writeInt(3) // //array 2, resource data
    {
      self.writeInt(3000001) // Gold ID
      self.writeInt(player.gold) // Gold Count
      self.writeInt(3000002) // Elixir ID
      self.writeInt(player.mana) // Elixir Count
      self.writeInt(3000003) // Dark Elixir ID
      self.writeInt(player.darkMana) // Dark Elixir Count
    }
    self.writeInt(1) //array 3, unit slot data
    {
      self.writeInt(4000008) // ID
      self.writeInt(1) // Amount
    }
    self.writeInt(0) //array 4, spell slot data
    self.writeInt(0) //array 5, unit upgrade slot
    self.writeInt(0) //array 6, spell upgrade slot
    self.writeInt(player.heroes) //array 7, hero upgrade slot
    {
      if (player.heroes === 1) {
        village.buildings.forEach(b => {
          if (b.data === 1000022) { // BK
            self.writeInt(28000000) // ID
            self.writeInt(b.data.lvl) // Level
          }
        })
      }
      else if (player.heroes === 2) {
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
    self.writeInt(player.heroes) //array 8, hero health slot
    {
      if (player.heroes === 1) {
        village.buildings.forEach(b => {
          if (b.data === 1000022) { // BK
            self.writeInt(28000000) // ID
            self.writeInt(0)
          }
        })
      }
      else if (player.heroes === 2) {
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
    self.writeInt(player.heroes) //array 9, hero state slot
    {
      if (player.heroes === 1) {
        village.buildings.forEach(b => {
          if (b.data === 1000022) { // BK
            self.writeInt(28000000) // ID
            self.writeInt(3) // 2 = Sleep, 3 = Guard
          }
        })
      }
      else if (player.heroes === 2) {
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