const LogicBase = require('./LogicBase')

class LogicNpcAvatar {
  async encode (self, levelID) {
    new LogicBase().encode(self)
    self.writeInt(levelID)
  }
}

module.exports = LogicNpcAvatar