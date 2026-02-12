const PiranhaMessage = require('../../PiranhaMessage')

class LoginFailedMessage extends PiranhaMessage {
  constructor (client, errorCode, reason) {
    super()
    this.id = 20103
    this.client = client
    this.version = 4
    this.errorCode = errorCode
    this.reason = reason
  }

  async encode () {
    // 8 = Update Available
    // 9 = Connection Error
    // 10 = Maintenance
    // 11 = Banned
    this.writeByte(this.errorCode) // ErrorCode
    this.writeString('') // Fingerprint
    this.writeString(null)
    this.writeString('') // Content URL
    this.writeString('') // Update URL
    this.writeString(this.reason) // Reason
    this.writeInt(0) // Maintenance Seconds
  }
}

module.exports = LoginFailedMessage