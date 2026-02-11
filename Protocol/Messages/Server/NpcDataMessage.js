const fs = require("fs")
const PiranhaMessage = require('../../PiranhaMessage')
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

    this.base = JSON.stringify(startingHome)
    this.writeString(this.base)

    const avatar = new ClientAvatar()
    avatar.encode(this)

    this.writeInt(0)
    this.writeInt(this.levelID) // NpcID
  }
}

module.exports = NpcDataMessage