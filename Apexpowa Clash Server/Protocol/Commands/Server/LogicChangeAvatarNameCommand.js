class LogicChangeAvatarNameCommand {
  async decode () {}

  async encode (self) {
    self.writeString(self.client.player.name) // Name
  }
}

module.exports = LogicChangeAvatarNameCommand