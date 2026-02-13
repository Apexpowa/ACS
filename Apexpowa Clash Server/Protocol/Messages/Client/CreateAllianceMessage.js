const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')

class CreateAllianceMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14301
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.AllianceName = this.readString()
    this.data.AllianceDescription = this.readString()
    this.data.AllianceBadge = this.readInt()
    this.data.AllianceType = this.readInt()
    this.data.RequiredScore = this.readInt()
    this.data.WarFrequency = this.readInt()
    this.data.AllianceOrigin = this.readInt()

    //console.log(this.data)
  }

  async process () {
    this.client.clanObject = Object.assign({}, {
      highID: this.client.player.clan.ClanHighID,
      lowID: this.client.player.clan.ClanLowID,
      name: this.data.AllianceName,
      description: this.data.AllianceDescription,
      type: this.data.AllianceType,
      requiredTrophies: this.data.RequiredScore,
      warFrequency: this.data.warFrequency,
      origin: this.data.AllianceOrigin
    })
    this.client.mongoose.getClan(this.client, async (err, clan) => {
      this.client.clan = clan
      await new AvailableServerCommandMessage(this.client, 1).send()
    })
  }
}

module.exports = CreateAllianceMessage