const fs = require("fs")
const PiranhaMessage = require('../../PiranhaMessage')
const ClientHome = require('../../../Logic/ClientHome')
const ClientAvatar = require('../../../Logic/ClientAvatar')

const startingHome = JSON.parse(
  fs.readFileSync("Gamefiles/level/tutorial_npc.json", "utf8")
)

class NpcDataMessage extends PiranhaMessage {
  constructor (client, levelID) {
    super()
    this.id = 24113
    this.client = client
    this.version = 1
    this.levelID = levelID
  }

  async encode () {
    this.writeInt(0)
    this.writeString(JSON.stringify(startingHome))
    new ClientAvatar().encode(this, this.client.player)

    // LogicNpcAvatar::encode
    {
      this.writeInt(0)
      this.writeInt(this.levelID)
    }
  }
}

module.exports = NpcDataMessage