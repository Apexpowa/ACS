const fs = require('fs')
const LogicBase = require('./LogicBase')
const { threadName } = require('worker_threads')

const startingHome = JSON.parse(fs.readFileSync('Gamefiles/level/starting_home.json', 'utf8'))
const goblinHome = JSON.parse(fs.readFileSync('Gamefiles/level/tutorial_npc.json', 'utf8'))

class ClientHome {
  async encode (self, player, type, levelID) {
    switch (type) {
      case 0: // Normal
        new LogicBase().encode(self)
        self.writeLong(player.highID, player.lowID) // HighID, LowID
        if (player.village == '') {
          player.village = JSON.stringify(startingHome)
          self.writeString(player.village)
          player.markModified('village') // HomeJSON
          //self.client.log('Created a new village!')
        }
        else {
          self.writeString(player.village) // HomeJSON
          //self.client.log('Loaded village!')
        }
        if (player.highID === self.client.player.highID && player.lowID === self.client.player.lowID) {
          const shieldDurationSeconds = Math.max(0, Math.floor(((player.shieldDurationSeconds || 0) - Date.now()) / 1000))
          self.writeInt(shieldDurationSeconds) // ShieldDurationSeconds
          player.markModified('shieldDurationSeconds')
          player.save()
        } else {
          self.writeInt(0) // ShieldDurationSeconds
        }
        self.writeInt(player.guardDurationSeconds) // GuardDurationSeconds
        self.writeInt(player.personalDurationSeconds) // PersonalDurationSeconds
        break

      case 1: // Goblin
        new LogicBase().encode(self)
        self.writeLong(0, 0) // HighID, LowID
        self.writeString(JSON.stringify(goblinHome)) // HomeJSON
        self.writeInt(0) // ShieldDurationSeconds
        self.writeInt(0) // GuardDurationSeconds
        self.writeInt(0) // PersonalDurationSeconds
        break
    }
  }
}

module.exports = ClientHome