const PiranhaMessage = require('../../PiranhaMessage')
const ClientHome = require('../../../Logic/ClientHome')
const ClientAvatar = require('../../../Logic/ClientAvatar')
const LogicNpcAvatar = require('../../../Logic/LogicNpcAvatar')
const fs = require('fs')
const goblinHome = JSON.parse(fs.readFileSync('Gamefiles/level/tutorial_npc.json', 'utf8'))

class NpcDataMessage extends PiranhaMessage {
  constructor (client, levelID) {
    super()
    this.id = 24113
    this.client = client
    this.version = 10
    this.levelID = levelID
  }

  async encode () {
    this.writeInt(0) // SecondsSinceLastSave
    this.writeString(JSON.stringify(goblinHome)) // LevelJSON
    new ClientAvatar().encode(this, this.client.player)
    new LogicNpcAvatar().encode(this, this.levelID)
  }
}

module.exports = NpcDataMessage