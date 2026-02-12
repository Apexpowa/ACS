const PiranhaMessage = require('../../PiranhaMessage')
const config = require('../../../config.json')

const LogicStartUnlockingBuildingCommand = require('../../Commands/Client/LogicStartUnlockingBuildingCommand')
const LogicMoveBuildingCommand = require('../../Commands/Client/LogicMoveBuildingCommand')
const LogicUpgradeBuildingCommand = require('../../Commands/Client/LogicUpgradeBuildingCommand')
const LogicBuyBuildingCommand = require('../../Commands/Client/LogicBuyBuildingCommand')
const LogicClearObstacleCommand = require('../../Commands/Client/LogicClearObstacleCommand')
const LogicTrainUnitCommand = require('../../Commands/Client/LogicTrainUnitCommand')
const LogicBuyTrapCommand = require('../../Commands/Client/LogicBuyTrapCommand')
const LogicBuyDecoCommand = require('../../Commands/Client/LogicBuyDecoCommand')
const LogicUnlockBuildingCommand = require('../../Commands/Client/LogicUnlockBuildingCommand')
const LogicNewShopItemsSeenCommand = require('../../Commands/Client/LogicNewShopItemsSeenCommand')
const LogicMoveMultipleBuildingsCommand = require('../../Commands/Client/LogicMoveMultipleBuildingsCommand')
const LogicLeagueNotificationsSeenCommand = require('../../Commands/Client/LogicLeagueNotificationsSeenCommand')
const LogicNewsSeenCommand = require('../../Commands/Client/LogicNewsSeenCommand')
const LogicEditModeShownCommand = require('../../Commands/Client/LogicEditModeShownCommand')
const LogicPlaceAttackerCommand = require('../../Commands/Client/LogicPlaceAttackerCommand')
const LogicEndCombatCommand = require('../../Commands/Client/LogicEndCombatCommand')
const LogicCastSpellCommand = require('../../Commands/Client/LogicCastSpellCommand')
const LogicPlaceHeroCommand = require('../../Commands/Client/LogicPlaceHeroCommand')
const LogicMatchmakingCommand = require('../../Commands/Client/LogicMatchmakingCommand')
const LogicCommandFailed = require('../../Commands/Client/LogicCommandFailed')

class EndClientTurnMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14102
    this.version = 1
  }

  async decode () {
    this.data = {}
    
    this.data.Tick = this.readInt()
    this.data.Checksum = this.readInt()
    this.data.Count = this.readInt()
    this.data.CommandID = this.readInt()

    //console.log(this.data)
  }

  async process () {
    var Commands = {
      500: LogicStartUnlockingBuildingCommand,
      501: LogicMoveBuildingCommand,
      502: LogicUpgradeBuildingCommand,
      504: LogicBuyBuildingCommand,
      507: LogicClearObstacleCommand,
      508: LogicTrainUnitCommand,
      510: LogicBuyTrapCommand,
      512: LogicBuyDecoCommand,
      520: LogicUnlockBuildingCommand,
      532: LogicNewShopItemsSeenCommand,
      533: LogicMoveMultipleBuildingsCommand,
      538: LogicLeagueNotificationsSeenCommand,
      539: LogicNewsSeenCommand,
      544: LogicEditModeShownCommand,
      600: LogicPlaceAttackerCommand,
      603: LogicEndCombatCommand,
      604: LogicCastSpellCommand,
      605: LogicPlaceHeroCommand,
      700: LogicMatchmakingCommand,
      701: LogicCommandFailed,
    }

    if (this.data.CommandID === 0) return

    if (Commands[this.data.CommandID]) {
      var command = new Commands[this.data.CommandID](this.client)

      if (config.Server.Debug) {
        this.client.log(`Gotcha ${this.data.CommandID} (${command.constructor.name}) packet! `)
      }

      await command.decode(this)
      await command.process(this)
    }
    else {
      this.client.log(`Gotcha undefined ${this.data.CommandID} packet!`)
    }
  }
}

module.exports = EndClientTurnMessage