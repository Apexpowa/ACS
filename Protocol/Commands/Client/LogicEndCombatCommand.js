const LeagueUtils = require('../../../Utilities/LeagueUtils')

class LogicEndCombatCommand {
  async decode (self) {}

  async process (self) {
    self.client.player.trophies += 30
    if (self.client.player.trophies > self.client.player.highestTrophies) {
      self.client.player.highestTrophies = self.client.player.trophies
      self.client.player.markModified('highestTrophies')
    }
    self.client.player.league = LeagueUtils.getLeagueByScore(self.client.player.trophies)

    self.client.log(
      `Battle surrendered! Trophies: ${self.client.player.trophies}, League: ${self.client.player.league}`
    )

    self.client.player.markModified('trophies')
    self.client.player.markModified('league')
    await self.client.player.save()
  }
}

module.exports = LogicEndCombatCommand