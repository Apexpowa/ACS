const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')
const Utils = require('../../../Utilities/Utils')

class LogicUpgradeHeroCommand {
  async decode(self) {
    this.data = {}

    this.data.HeroID = self.readInt()
    this.data.UpgradeWithMana = self.readInt()

    //console.log(this.data)
  }

  async process(self) {
    // TODO: Hero build time, for now it will instantly build
    let village = JSON.parse(self.client.player.village)
    const classID = Utils.getClassID(this.data.HeroID)
    const instanceID = Utils.getInstanceID(this.data.HeroID)
    const hero = village.buildings[instanceID]
    if (!hero) return

    hero.lvl = (hero.lvl || 0) + 1

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    self.client.player.save()
  }
}

module.exports = LogicUpgradeHeroCommand