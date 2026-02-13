const fs = require("fs")

const startingHome = JSON.parse(
  fs.readFileSync("Gamefiles/level/starting_home.json", "utf8")
)

class ClientHome {
  async encode (self, player) {
    self.writeInt(0) // NpcTimestamp

    self.writeLong(player.highID, player.lowID) // HighID, LowID

    // Village
    if (player.village == '') {
      player.village = JSON.stringify(startingHome)
    
      self.writeString(player.village)

      player.markModified('village')
      player.save()
      //self.client.log('Created a new village!')
    }
    else {
      self.writeString(player.village)

      //self.client.log('Loaded village!')
    }

    self.writeInt(player.shieldDurationSeconds) // ShieldDurationSeconds
    self.writeInt(player.guardDurationSeconds) // GuardDurationSeconds
    self.writeInt(player.personalDurationSeconds) // PersonalDurationSeconds
  }
}

module.exports = ClientHome