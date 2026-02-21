class ClientAvatar {
  async encode (self, player) {
    self.writeInt(0) // 6.253

    self.writeLong(player.highID, player.lowID) // HighID, LowID
    self.writeLong(player.highID, player.lowID) // HighID, LowID
    
    self.writeByte(0) // IsInAlliance
    self.writeInt(0) // League

    self.writeInt(0) // AllianceCastleLevel
    self.writeInt(10) // AllianceCastleTotalCapacity
    self.writeInt(0) // AllianceCastleUsedCapacity
    self.writeInt(0) // TownhallLevel
    self.writeString('Payback') // Name
    self.writeString(null) // FacebookID
    self.writeInt(1) // Level
    self.writeInt(self.levelID) // Experience
    self.writeInt(0) // Diamonds
    self.writeInt(0) // FreeDiamonds
    self.writeInt(0) // AttackRating
    self.writeInt(0) // AttackKFactor
    self.writeInt(0) // Score
    self.writeInt(0) // AttackWinCount
    self.writeInt(0) // AttackLoseCount
    self.writeInt(0) // DefendWinCount
    self.writeInt(0) // DefendLoseCount
    self.writeInt(0) // AllianceCastleGold
    self.writeInt(0) // AllianceCastleMana
    self.writeInt(0) // AllianceCastleDarkMana

    self.writeBoolean(player.nameChangesCount > 1 ? 1 : 0) // nameChangesCount
    self.writeInt(0) // CumulativePurchasedDiamonds

    // Arrays
    self.writeInt(0) // array 1, resource cap data
    self.writeInt(0) // //array 2, resource data
    self.writeInt(0) //array 3, unit slot data
    self.writeInt(0) //array 4, spell slot data
    self.writeInt(0) //array 5, unit upgrade slot
    self.writeInt(0) //array 6, spell upgrade slot
    self.writeInt(0) //array 7, hero upgrade slot
    self.writeInt(0) //array 8, hero health slot
    self.writeInt(0) //array 9, hero state slot
    self.writeInt(0) //array 10, alliance unit data
    self.writeInt(0) //array 11, tutorial steps data
    self.writeInt(0) //array 12, achievement rewards data
    self.writeInt(0) //array 13, achievement progress data
    self.writeInt(0) //array 14, npc map progress data
    self.writeInt(0) //array 15, npc looted gold data
    self.writeInt(0) //array 16, npc looted elixir data
  }
}

module.exports = ClientAvatar