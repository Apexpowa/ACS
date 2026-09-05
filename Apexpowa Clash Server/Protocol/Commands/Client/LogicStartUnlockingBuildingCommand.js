const AvailableServerCommandMessage = require('../../Messages/Server/AvailableServerCommandMessage')

class LogicStartUnlockingBuildingCommand {
  async decode (self) {
    this.data = {}

    this.data.PositionX = self.readInt()
    this.data.PositionY = self.readInt()
    this.data.BuildingID = self.readInt()
    this.data.Unknown = self.readInt()

    //console.log(this.data)
  }

  async process (self) {
    let village = self.client.player.village
    village = JSON.parse(village)
    if (!Array.isArray(village.buildings)) village.buildings = []
    
    const building = {
      data: this.data.BuildingID,
      lvl: 0,
      x: this.data.PositionX,
      y: this.data.PositionY
    }
    if (this.data.BuildingID === 1000000) {
      building.units = []
      building.storage_type = 0
    }
    else if (this.data.BuildingID === 1000002) {
      building.res_time = 179979
    }
    else if (this.data.BuildingID === 1000004) {
      building.res_time = 179979
    }
    else if (this.data.BuildingID === 1000006) { // Barracks
      building.unit_prod = {}
      building.unit_prod.unit_type = 0
    }
    else if (this.data.BuildingID === 1000007) { // Laboratory
      building.res_time = 179979
    }
    else if (this.data.BuildingID === 1000009) {
      building.ammo = 750
    }
    else if (this.data.BuildingID === 1000020) { // Spell Factory
      building.units = []
      building.storage_type = 1
      building.unit_prod = {}
      building.unit_prod.unit_type = 1
    }
    else if (this.data.BuildingID === 1000021) { // X-Bow
      building.attack_mode = false
      building.ammo = 1500
    }
    else if (this.data.BuildingID === 1000023) {
      building.res_time = 57579
    }
    else if (this.data.BuildingID === 1000024) {
      building.res_time = 57579
    }
    else if (this.data.BuildingID === 1000026) {
      building.unit_prod = {}
      building.unit_prod.unit_type = 0
    }
    else if (this.data.BuildingID === 1000027) {
      building.ammo = 750
    }
    village.buildings.push(building)

    if (this.data.BuildingID === 1000022) {
      if (self.client.player.heroes === 0) {
        self.client.player.heroes = 1
        self.client.player.markModified('heroes')
      }
    }
    else if (this.data.BuildingID === 1000025) {
      if (self.client.player.heroes === 1) {
        self.client.player.heroes = 2
        self.client.player.markModified('heroes')
      }
    }

    self.client.player.village = JSON.stringify(village)
    self.client.player.markModified('village')
    await self.client.player.save()
  }
}

module.exports = LogicStartUnlockingBuildingCommand