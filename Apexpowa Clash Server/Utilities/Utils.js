module.exports = {
    instanceIDtoSCID(id) {
        if (id < 63) {
            return 26 * 1000000 + (id - 1);
        }
        else if (id > 62 && id < 77) {
            return 27 * 1000000 + (id - 63);
        }
        else if (id > 76 && id < 100) {
            return 28 * 1000000 + (id - 78);
        }
        return null;
    },
    SCIDtoInstanceID(id) {
        if (parseInt(id / 1000000) === 26) {
            return id - 26000000 + 1;
        }
        else if (parseInt(id / 1000000) === 27) {
            return id - 27000000 + 63;
        }
        else if (parseInt(id / 1000000) === 28) {
            return id - 28000000 + 78;
        }
        return null;
    },
    randomInt(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    }
}