const fs = require("fs")

const startingHome = JSON.parse(
  fs.readFileSync("Gamefiles/level/starting_home.json", "utf8")
)

class ClientHome {
  async encode (self) {
    self.writeInt(0) // NpcTimestamp

    self.writeLong(self.client.player.highID, self.client.player.lowID) // HighID, LowID

    // Village
    if (self.client.player.village == '') {
      self.client.player.village = JSON.stringify(startingHome)
    
      self.writeString(self.client.player.village)

      self.client.player.markModified('village')
      self.client.player.save()
      //self.client.log('Created a new village!')
    }
    else {
      self.writeString(self.client.player.village)

      //self.client.log('Loaded village!')
    }

    self.writeInt(self.client.player.shieldDurationSeconds) // ShieldDurationSeconds
    self.writeInt(self.client.player.guardDurationSeconds) // GuardDurationSeconds
    self.writeInt(self.client.player.personalDurationSeconds) // PersonalDurationSeconds
  }
}

module.exports = ClientHome