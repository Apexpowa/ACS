const PiranhaMessage = require('../../PiranhaMessage')
const AllianceListMessage = require('../Server/AllianceListMessage')

class SearchAlliancesMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14324
    this.version = 1
  }

  async decode () {
    this.data = {}

    this.data.SearchString = this.readString()
    this.data.WarFrequency = this.readInt()
    this.data.AllianceOrigin = this.readInt()
    this.data.MaximumAllianceMembers = this.readInt()
    this.data.MinimumAllianceMembers = this.readInt()
    this.data.AllianceScore = this.readInt()
    this.data.ShowOnlyJoinableAlliances = this.readVInt()
    this.data.Unknown = this.readInt()
    this.data.MinimumAllianceLevel = this.readInt()

    //console.log(this.data)
  }

  async process () {
    const filters = {
      locationInstanceID: this.data.AllianceOrigin,
      minimumMembers: this.data.MinimumAllianceMembers,
      maximumMembers: this.data.MaximumAllianceMembers,
      minimumRequiredTrophies: this.data.AllianceScore,
      canJoin: this.data.ShowOnlyJoinableAlliances === 1
    }
    await new AllianceListMessage(this.client, this.data.SearchString, filters).send()
  }
}

module.exports = SearchAlliancesMessage