const PiranhaMessage = require('../../PiranhaMessage')
const LogicJoinAllianceCommand = require('../../Commands/Server/LogicJoinAllianceCommand')
const LogicChangeAvatarNameCommand = require('../../Commands/Server/LogicChangeAvatarNameCommand')

class AvailableServerCommandMessage extends PiranhaMessage {
  constructor (client, commandID) {
    super()
    this.id = 24111
    this.client = client
    this.version = 1
    this.commandID = commandID
  }

  async encode () {
    var commands = {
      1: LogicJoinAllianceCommand,
      3: LogicChangeAvatarNameCommand,
    }

    if (this.commandID in commands) {
      const command = new commands[this.commandID]()

      this.writeInt(this.commandID)
      await command.encode(this)
      this.client.log(`Gotcha ${this.commandID} (${command.constructor.name}) packet! `)
    }
    else {
      this.client.log(`Gotcha undefined ${this.commandID} packet!`)
    }
  }
}

module.exports = AvailableServerCommandMessage