const PiranhaMessage = require('../../PiranhaMessage')

class LoginOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20104
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
    this.writeString(this.client.player.token) // Token
    this.writeString(null) // FacebookID
    this.writeString(null) // GamecenterID
    this.writeInt(6) // Major
    this.writeInt(0) // Build
    this.writeInt(253) // Content
    this.writeString('prod') // Environment
    this.writeInt(0) // SessionCount
    this.writeInt(0) // PlayTimeSeconds
    this.writeInt(0) // DaysSinceStartedPlaying
    this.writeString(null) // FacebookAppID
    this.writeString(null) // ServerTime
    this.writeString(null) // AccountCreatedDate
    this.writeInt(0) // StartupCooldownSeconds
    this.writeString(null) // GoogleServiceId
    this.writeString(null) // Region
    this.writeString(null) // CountryCode
    this.writeInt(1)
    this.writeString(null)
    this.writeString(null)
    this.writeString(null)
    
    this.writeString(null) // ContentUrlList
    this.writeString(null) // ChronosContentUrlList
    
    /*this.writeInt(2)
    {
      this.writeString("https://game-assets.clashofclans.com/")
      this.writeString("http://b46f744d64acd2191eda-3720c0374d47e9a0dd52be4d281c260f.r11.cf2.rackcdn.com/")
    }
    this.writeInt(1)
    {
      this.writeString("https://event-assets.clashofclans.com")
    }*/
  }
}

module.exports = LoginOkMessage