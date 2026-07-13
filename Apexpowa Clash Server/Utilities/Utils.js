module.exports = {
    createGlobalID(index, count) {
        return count + (1000000 * index)
    },

    getInstanceID(globalID) {
        return globalID % 1000000
    },

    getClassID(globalID) {
        return Math.floor(globalID / 1000000)
    },

    instanceIDtoSCID(id) {
        const classID = Math.floor(id / 1000000)
        const instanceID = id % 1000000

        return classID * 1000000 + instanceID
    },

    SCIDtoInstanceID(id) {
        return id % 1000000
    },

    randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low)
    }
}