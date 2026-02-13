const mongoose = require('mongoose');
const config = require('../config.json');

const LoginFailedMessage = require('../Protocol/Messages/Server/LoginFailedMessage')

module.exports = class DataBase {
    constructor() { }
    connect(isSuccess) {
        mongoose.connect(`mongodb://${config.Database.Password ? `${config.Database.Password}:` : ''}${config.Database.Host}/${config.Database.Name}`)
            .then(() => {
                require('./models/players');
                this.mongoosePlayers = mongoose.model('players');
                require('./models/clans');
                this.mongooseClans = mongoose.model('clans');
                isSuccess(true);
            })
            .catch(function (error) {
                console.log(error);
                isSuccess(false);
            });
    }
    disconnect() {
        mongoose.disconnect()
            .then(result => {
                console.log(`Successfully disconnected from the database`, result);
            })
            .catch(error => {
                console.log(`An error occoured disconnecting from the database`, error);
            });
    }
    getPlayer(device, callback) {
        this.mongoosePlayers.findOne({
            highID: device.userObject.highID,
            lowID: device.userObject.lowID,
            token: device.userObject.token
        })
            .then(player => {
                if (player) {
                    callback(false, player);
                } else {
                   //if (device.userObject.token === '') {
                        this.mongoosePlayers.findOne({})
                            .sort({
                                lowID: 'desc'
                            })
                            .then(lastPlayer => {
                                generateToken(28, newToken => {
                                    this.mongoosePlayers.create({
                                        highID: 0,
                                        lowID: lastPlayer ? (lastPlayer.lowID + 1) : 1,
                                        token: newToken
                                    })
                                        .then(createdPlayer => {
                                            callback(false, createdPlayer);
                                        });
                                });
                            });
                   /*}
                    else {
                        new LoginFailedMessage(this.client, 3, 'Clear your app data and try again!').send()
                    }*/
                }
            })
            .catch(error => {
                console.log(`An error occoured fetching a player from the database`, error);
            });
    }
    getClan(device, callback) {
        if (device.player.inClan) {
            this.mongooseClans.findOne({
                highID: device.clanObject.ClanHighID,
                lowID: device.clanObject.ClanLowID
            })
                .then(clan => {
                    if (clan) {
                        console.log("Clan found!");
                        callback(clan);
                    } else {
                        console.log("Clan not found!");
                        this.mongooseClans.findOne({})
                            .sort({
                                lowID: 'desc'
                            })
                            .then(lastClan => {
                                this.mongooseClans.create({
                                    highID: 0,
                                    lowID: lastClan ? (lastClan.lowID + 1) : 1
                                })
                                    .then(createdClan => {
                                        callback(false, createdClan);
                                    });
                            });
                    }
                })
                .catch(error => {
                    console.log(`An error occoured fetching a clan from the database`, error);
                });
        } else {
            console.log(`Player doesn't have a clan!`);
        }
    }
    
    getRandomPlayer(excludeLowID, callback) {
        this.mongoosePlayers.aggregate([
            { $match: { lowID: { $ne: excludeLowID } } },
            { $sample: { size: 1 } }
        ])
        .then(result => {
            if (result.length > 0) {
                callback(null, result[0])
            } else {
                callback("No players found!", null)
            }
        })
        .catch(err => {
            console.log("Error getting random player:", err)
            callback(err, null)
        })
    }n

    getSpecificPlayer(highID, lowID, callback) {
        this.mongoosePlayers.findOne({ highID: highID, lowID: lowID })
            .then(result => {
                if (result) {
                    callback(null, result)
                } else {
                    callback("Player not found!", null)
                }
            })
            .catch(err => {
                console.log("Error getting player:", err)
                callback(err, null)
            })
    }
}

function generateToken(n, callback) {
    require('crypto').randomBytes(n, function (err, buffer) {
        callback(buffer.toString('hex'));
    });
}