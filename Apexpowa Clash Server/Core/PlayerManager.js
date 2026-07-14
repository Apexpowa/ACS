const clients = new Set()

module.exports = {
  add(client) {
    clients.add(client)
  },

  remove(client) {
    clients.delete(client)
  },

  getAll() {
    return clients
  }
}