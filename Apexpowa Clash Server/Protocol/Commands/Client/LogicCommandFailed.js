class LogicCommandFailed {
  async decode (self) {}

  async process (self) {
    self.writeInt(0) // FailedCommandType
  }
}

module.exports = LogicCommandFailed