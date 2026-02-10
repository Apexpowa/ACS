console.clear()

const figlet = require('figlet')

const net = require('net')
const { execSync } = require('child_process')
const os = require('os')
const MessageFactory = require('./Protocol/MessageFactory')
const server = new net.Server()
const Messages = new MessageFactory()
const config = require('./config.json')
const PORT = config.Server.Port

const Crypto = require("./Crypto")

let mongooseInstance = require('./DataBase/mongoose')
mongooseInstance = new mongooseInstance()

server.on('connection', async (client) => {
  client.setNoDelay(true)
  client.log = function (text) {
    if (config.Server.Debug) {
      // disabled cuz we need privacy bruh:
      //return console.log(`[${this.remoteAddress.split(':').slice(-1)}]    ${text}`)

      return console.log(`[ACS]    ${text}`)
    }
    else
    {
      return console.log(`[ACS]    ${text}`)
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
      client.log(`Gotcha undefined ${message.id} packet!`)
    }
  })

  client.on('end', async () => {
    return client.log('Client disconnected.')
  })

  client.on('error', async error => {
    try {
      client.log('A wild error!')
      console.log(error)
      client.destroy()
    } catch (e) { }
  })
})

/*function checkPort(port) {
  if (port != 0) {
    try {
      const platform = os.platform()

      if (platform === 'win32') { // Windows
        const cmd = `netstat -ano | findstr :${port}`
        const output = execSync(cmd).toString()

        if (output) {
          const lines = output.trim().split('\n')
          lines.forEach(line => {
            const parts = line.trim().split(/\s+/)
            const pid = parts[parts.length - 1]
            if (pid) {
              try {
                //console.log(`[SERVER]    Port ${port} is in use. Killing PID ${pid}...`)
                execSync(`taskkill /PID ${pid} /F`)
              } catch (err) {}
            }
          })
        }
      } else { // Linux or macOS
        const cmd = `lsof -i :${port} -t`
        const output = execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim()
        if (output) {
          const pids = output.split('\n')
          pids.forEach(pid => {
            if (pid) {
              try {
                  //console.log(`[SERVER]    Port ${port} is in use. Killing PID ${pid}...`)
                  execSync(`kill -9 ${pid}`)
              } catch (err) {}
            }
          })
        }
      }
    } catch (err) {}
  }
}*/

console.log(figlet.textSync('ACS', {font: 'Bloody'}))
console.log("This program is made by the Apexpowa team.")
console.log(`You can find the source at https://github.com/Apexpowa/ACS !`)
console.log(`Don't forget to visit https://github.com/Apexpowa/ACS daily for updates!`)
console.log()
console.log("ACS 6.253 is now starting...")
mongooseInstance.connect(isSuccess => {
  if (isSuccess) {
    //checkPort(PORT)
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