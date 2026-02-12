const LeaguePlayersMessage = require('../../Messages/Server/LeaguePlayersMessage')

class LogicLeagueNotificationsSeenCommand {
  async decode (self) {}

  async process (self) {
    await new LeaguePlayersMessage(self.client).send()
  }
}

module.exports = LogicLeagueNotificationsSeenCommand