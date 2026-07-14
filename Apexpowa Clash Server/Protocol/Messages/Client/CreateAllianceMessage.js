const PiranhaMessage = require('../../PiranhaMessage')
const AvailableServerCommandMessage = require('../Server/AvailableServerCommandMessage')
const OutOfSyncMessage = require('../Server/OutOfSyncMessage')
const ServerErrorMessage = require('../Server/ServerErrorMessage')

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
    const player = this.client.player
    const db = this.client.mongoose

    if (player.inClan) {
      await new OutOfSyncMessage(this.client).send() // Already in a clan
      return
    }

    if (!this.data.AllianceName || this.data.AllianceName.trim().length === 0) {
      await new OutOfSyncMessage(this.client).send() // Name is required
      return
    }

    // TODO: Invite Only
    if (this.data.AllianceType === 2) {
      await new ServerErrorMessage(this.client, "Invite Only is not implemented yet.").send()
      return
    }

    try {
      await db.createClan(player, {
        name: this.data.AllianceName,
        description: this.data.AllianceDescription || '',
        badge: this.data.AllianceBadge,
        type: this.data.AllianceType,
        requiredTrophies: this.data.RequiredScore,
        //warFrequency: this.data.warFrequency,
        location: this.data.AllianceOrigin
      })

      await new AvailableServerCommandMessage(this.client, 1).send()
    } catch (e) { console.error(e) }
  }
}

module.exports = CreateAllianceMessage