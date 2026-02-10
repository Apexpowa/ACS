const PiranhaMessage = require('../../PiranhaMessage')

class LoginFailedMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20103
    this.client = client
    this.version = 4
  }

  async encode () {
    // 8 = Update Available
    // 9 = Connection Error
    // 10 = Maintenance
    // 11 = Banned
    this.writeByte(10) // ErrorCode
    this.writeString('') // Fingerprint
    this.writeString(null)
    this.writeString('') // Content URL
    this.writeString('') // Update URL
    this.writeString('RandomReason') // Reason
    this.writeInt(0) // Maintenance Seconds
  }
}

module.exports = LoginFailedMessage