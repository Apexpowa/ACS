class LogicEndCombatCommand {
  async decode (self) {}

  async process (self) {
    self.client.log('Surrendered battle!')
  }
}

module.exports = LogicEndCombatCommand