const LogicBase = require('./LogicBase')

class LogicNpcAvatar {
  async encode (self, levelID) {
    new LogicBase().encode(self)
    self.writeDataReference(0, levelID)
  }
}

module.exports = LogicNpcAvatar