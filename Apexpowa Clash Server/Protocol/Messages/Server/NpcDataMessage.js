const fs = require("fs")
const PiranhaMessage = require('../../PiranhaMessage')
const NpcAvatar = require('../../../Logic/NpcAvatar')

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

    // Home
    {
      this.writeInt(0) // NpcTimestamp
      this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
      this.base = JSON.stringify(startingHome)
      this.writeString(this.base)
      this.writeInt(0) // ShieldDurationSeconds
      this.writeInt(0) // GuardDurationSeconds
      this.writeInt(0) // PersonalDurationSeconds
    }

    // Avatar
    {
      const avatar = new NpcAvatar()
      avatar.encode(this, this.client.player)
    }

    this.writeInt(this.levelID) // NpcID
  }
}

module.exports = NpcDataMessage