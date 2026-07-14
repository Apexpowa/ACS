console.clear()

const net = require('net')
const { execSync } = require('child_process')
const os = require('os')
const MessageFactory = require('./Protocol/MessageFactory')
const server = new net.Server()
const Messages = new MessageFactory()
const config = require('./config.json')
const PORT = config.Server.Port

const Crypto = require("./Crypto")

let mongooseInstance = require('./Database/mongoose')
mongooseInstance = new mongooseInstance()

const PlayerManager = require('./Core/PlayerManager')

server.on('connection', async (client) => {
  PlayerManager.add(client)
  
  client.setNoDelay(true)
  client.log = function (text) {
    if (config.Server.Debug) {
      if (config.Server.StreamerMode) {
        return console.log(`[ACS]    ${text}`)
      } else {
        return console.log(`[${this.remoteAddress.split(':').slice(-1)}]    ${text}`)
      }
    }
  }

  client.log('A wild connection appeared!')
  client.crypto = new Crypto()
  client.mongoose = mongooseInstance
  
  const packets = Messages.getPackets()

  client.on('data', async (packet) => {
    const message = {
      id: packet.readUInt16BE(0),
      len: packet.readUIntBE(2, 3),
      version: packet.readUInt16BE(5),
      payload: packet.slice(7, this.len),
      client,
    }
    
    message.payload = await client.crypto.decrypt(message.payload)

    if (packets.indexOf(String(message.id)) !== -1) {
      try {
        const packet = new (Messages.handle(message.id))(message.payload, client)

        if (config.Server.Debug) {
          client.log(`Gotcha ${message.id} (${packet.constructor.name}) packet! `)
        }

        await packet.decode()
        await packet.process()
      } catch (e) {
        console.log(e)
      }
    } else {
      if (message.id > 10099) {
        client.log(`Gotcha undefined ${message.id} packet!`)
      }
    }
  })

  client.on('end', async () => {
    PlayerManager.remove(client)
    return client.log('Client disconnected.')
  })

  client.on('error', async error => {
    try {
      PlayerManager.remove(client)
      client.log('A wild error!')
      console.log(error)
      client.destroy()
    } catch (e) { }
  })
})

// https://patorjk.com/software/taag/#p=display&f=Bloody&t=ACS&x=none&v=4&h=4&w=80&we=false
console.log(`
 ▄▄▄       ▄████▄    ██████ 
▒████▄    ▒██▀ ▀█  ▒██    ▒ 
▒██  ▀█▄  ▒▓█    ▄ ░ ▓██▄   
░██▄▄▄▄██ ▒▓▓▄ ▄██▒  ▒   ██▒
 ▓█   ▓██▒▒ ▓███▀ ░▒██████▒▒
 ▒▒   ▓▒█░░ ░▒ ▒  ░▒ ▒▓▒ ▒ ░
  ▒   ▒▒ ░  ░  ▒   ░ ░▒  ░ ░
  ░   ▒   ░        ░  ░  ░  
      ░  ░░ ░            ░  
          ░                 
`)
console.log("This program is made by the Apexpowa team.")
console.log(`You can find the source at https://github.com/Apexpowa/ACS !`)
console.log(`Don't forget to visit https://github.com/Apexpowa/ACS daily for updates!`)
console.log()
console.log(`ACS ${config.Server.Versions} is now starting...`)
mongooseInstance.connect(isSuccess => {
  if (isSuccess) {
    server.once('listening', () => {
        console.log(`Gateway started on port ${PORT}!`)
        console.log(`Server started successfully, Let's play Clash of Clans!`)
    })
    server.listen(PORT)
  }
  else {
    console.log("[SERVER]    Server didn't start because of a database problem.")
  }
})

process.on("uncaughtException", e => console.log(e))

process.on("unhandledRejection", e => console.log(e))
