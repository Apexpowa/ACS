const mongoose = require('mongoose')
const config = require('../config.json')

const LoginFailedMessage = require('../Protocol/Messages/Server/LoginFailedMessage')

module.exports = class Database {
    constructor() { }
    connect(isSuccess) {
        mongoose.connect(`mongodb://${config.Database.Password ? `${config.Database.Password}:` : ''}${config.Database.Host}/${config.Database.Name}`)
            .then(() => {
                require('./models/players')
                this.mongoosePlayers = mongoose.model('players')
                require('./models/clans')
                this.mongooseClans = mongoose.model('clans')
                isSuccess(true)
            })
            .catch(function (error) {
                console.log(error)
                isSuccess(false)
            })
    }
    disconnect() {
        mongoose.disconnect()
            .then(result => {
                console.log(`Successfully disconnected from the database`, result)
            })
            .catch(error => {
                console.log(`An error occoured disconnecting from the database`, error)
            })
    }
    getPlayer(device, callback) {
        this.mongoosePlayers.findOne({
            highID: device.userObject.highID,
            lowID: device.userObject.lowID,
            token: device.userObject.token
        })
            .then(player => {
                if (player) {
                    callback(false, player)
                } else {
                   //if (device.userObject.token === '') {
                        this.mongoosePlayers.findOne({})
                            .sort({
                                lowID: 'desc'
                            })
                            .then(lastPlayer => {
                                generateToken(14, newToken => {
                                    this.mongoosePlayers.create({
                                        highID: 0,
                                        lowID: lastPlayer ? (lastPlayer.lowID + 1) : 1,
                                        token: newToken
                                    })
                                        .then(createdPlayer => {
                                            callback(false, createdPlayer)
                                        })
                                })
                            })
                   /*}
                    else {
                        new LoginFailedMessage(this.client, 3, 'Clear your app data and try again!').send()
                    }*/
                }
            })
            .catch(error => {
                console.log(`An error occoured fetching a player from the database`, error)
            })
    }
    getClan(device, callback) {
        if (device.player.inClan) {
            this.mongooseClans.findOne({
                highID: device.clanObject.ClanHighID,
                lowID: device.clanObject.ClanLowID
            })
                .then(clan => {
                    if (clan) {
                        console.log("Clan found!")
                        callback(clan)
                    } else {
                        console.log("Clan not found!")
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
                                        callback(false, createdClan)
                                    })
                            })
                    }
                })
                .catch(error => {
                    console.log(`An error occoured fetching a clan from the database`, error)
                })
        } else {
            console.log(`Player doesn't have a clan!`)
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
    }

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

    getTopPlayers(limit = 200) { return this.mongoosePlayers.find({}).limit(limit).sort({ trophies: -1 }); }
    getLocalPlayers(limit = 200) { return this.mongoosePlayers.find({}).limit(limit).sort({ trophies: -1 }); }
    async getClanByID(highID, lowID) { return this.mongooseClans.findOne({ highID, lowID }); }

    async getPlayerClan(player) {
        if (!player || !player.clan || !player.inClan) return null;
        return this.getClanByID(player.clan.ClanHighID, player.clan.ClanLowID);
    }

    async getPlayerByID(highID, lowID) {
        if (highID === undefined || lowID === undefined) return null;
        return this.mongoosePlayers.findOne({ highID, lowID }).lean();
    }

    /*async searchClans(nameQuery = '', limit = 20, filters = {}) {
        const trimmedQuery = String(nameQuery || '').trim()
        const query = {};
        if (trimmedQuery) query.name = { $regex: trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
        if (filters.locationInstanceID !== undefined && filters.locationInstanceID !== null) query.location = filters.locationInstanceID;
        if (filters.minimumRequiredTrophies !== undefined && filters.minimumRequiredTrophies !== null) query.requiredTrophies = { $gte: filters.minimumRequiredTrophies };
        if (filters.canJoin) query.type = { $ne: 2 }; // exclude closed clans
        let clans = await this.mongooseClans.find(query).sort({ trophies: -1 }).lean();
        if (filters.minimumMembers !== undefined && filters.minimumMembers !== null) clans = clans.filter(c => c.members.length >= filters.minimumMembers);
        if (filters.maximumMembers !== undefined && filters.maximumMembers !== null) clans = clans.filter(c => c.members.length <= filters.maximumMembers);
        return clans.slice(0, limit);
    }*/
    async searchClans(nameQuery = '', limit = 20) {
        const trimmedQuery = String(nameQuery || '').trim()
        const filter = trimmedQuery
            ? { name: { $regex: trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' } }
            : {};
        return this.mongooseClans.find(filter).limit(limit).sort({ trophies: -1 });
    }

    async getJoinableClans(limit = 20) { return this.mongooseClans.find({ type: 0 }).limit(limit).sort({ trophies: -1 }).lean(); }
    async getTopClans(limit = 200) { return this.mongooseClans.find({}).limit(limit).sort({ trophies: -1 }); }

    async createClan(player, { name, description, badge, type, requiredTrophies, location }) {
        // Get the next lowID
        const lastClan = await this.mongooseClans.findOne({}).sort({ lowID: 'desc' });
        const newLowID = lastClan ? lastClan.lowID + 1 : 1;

        const memberEntry = buildMemberEntry(player, 2 /* Leader */);

        const clan = await this.mongooseClans.create({
            highID: 0,
            lowID: newLowID,
            name,
            description: description || '',
            badge: badge || 1,
            type: type || 0,
            requiredTrophies: requiredTrophies || 0,
            location: location || 57,
            trophies: player.trophies,
            members: [memberEntry]
        });

        player.inClan = 1;
        player.clan.ClanHighID = clan.highID;
        player.clan.ClanLowID = clan.lowID;
        player.clan.ClanRole = 2; // Leader

        player.markModified('clan');
        await player.save();

        return clan;
    }

    async joinClan(player, clan) {
        if (clan.members.length >= 50) throw new Error('Clan is full.');
        if (clan.type === 2 /* Closed */) throw new Error('Clan is closed.');
        if (player.trophies < clan.requiredTrophies) throw new Error(`Need ${clan.requiredTrophies} trophies to join.`);

        const memberEntry = buildMemberEntry(player, 1 /* Member */);
        clan.members.push(memberEntry);

        clan.trophies = clan.members.reduce((sum, m) => sum + (m.trophies || 0), 0);
        clan.markModified('members');
        await clan.save();

        player.inClan = 1;
        player.clan.ClanHighID = clan.highID;
        player.clan.ClanLowID = clan.lowID;
        player.clan.ClanRole = 1; // Member

        player.markModified('clan');
        await player.save();

        return clan;
    }

    async leaveClan(player) {
        const clan = await this.getClanByID(
            player.clan.ClanHighID,
            player.clan.ClanLowID
        );
        if (!clan) return;

        const wasLeader = player.clan.ClanRole === 2;

        clan.members = clan.members.filter(m => !(m.highID === player.highID && m.lowID === player.lowID));

        if (clan.members.length === 0) {
            await this.mongooseClans.deleteOne({ highID: clan.highID, lowID: clan.lowID });
        } else {
            if (wasLeader) {
                clan.members[0].role = 2;
                await this.mongoosePlayers.updateOne(
                    { highID: clan.members[0].highID, lowID: clan.members[0].lowID },
                    { $set: { 'clan.ClanRole': 2 } }
                );
            }
            clan.trophies = clan.members.reduce((sum, m) => sum + (m.trophies || 0), 0);
            clan.markModified('members');
            await clan.save();
        }

        player.inClan = 0;
        player.clan.ClanHighID = 0;
        player.clan.ClanLowID = 1;
        player.clan.ClanRole = 0;

        player.markModified('clan');
        await player.save();
    }

    async updateClanSettings(clan, { description, badge, type, requiredTrophies, location }) {
        if (description !== undefined) clan.description = description;
        if (badge !== undefined) clan.badge = badge;
        if (type !== undefined) clan.type = type;
        if (requiredTrophies !== undefined) clan.requiredTrophies = requiredTrophies;
        if (location !== undefined) clan.location = location;
        await clan.save();
        return clan;
    }

    async promoteMember(clan, memberHighID, memberLowID, newRole) {
        const member = clan.members.find(m => m.highID === memberHighID && m.lowID === memberLowID);
        if (!member) throw new Error('Member not found.');
        
        member.role = newRole;
        clan.markModified('members');
        await clan.save();

        // Update player in database
        await this.mongoosePlayers.updateOne(
            { highID: memberHighID, lowID: memberLowID },
            { $set: { 'clan.ClanRole': newRole } }
        );

        return member;
    }

    async kickMember(clan, memberHighID, memberLowID) {
        const memberIndex = clan.members.findIndex(m => m.highID === memberHighID && m.lowID === memberLowID);
        if (memberIndex === -1) throw new Error('Member not found.');

        const kicked = clan.members[memberIndex];
        clan.members.splice(memberIndex, 1);

        if (clan.members.length === 0) {
            await this.mongooseClans.deleteOne({ highID: clan.highID, lowID: clan.lowID });
        } else {
            clan.trophies = clan.members.reduce((sum, m) => sum + (m.trophies || 0), 0);
            clan.markModified('members');
            await clan.save();
        }

        // Update kicked player
        await this.mongoosePlayers.updateOne(
            { highID: memberHighID, lowID: memberLowID },
            { $set: { 'inClan': 0, 'clan.ClanHighID': 0, 'clan.ClanLowID': 1, 'clan.ClanRole': 0 } }
        );

        return kicked;
    }

    async getClanMembers(highID, lowID) {
        const clan = await this.getClanByID(highID, lowID);
        if (!clan) return [];
        return clan.members || [];
    }

    async updateMemberStats(memberHighID, memberLowID, stats) {
        const clans = await this.mongooseClans.find({ 'members.highID': memberHighID, 'members.lowID': memberLowID });
        
        for (const clan of clans) {
            const member = clan.members.find(m => m.highID === memberHighID && m.lowID === memberLowID);
            if (member) {
                if (stats.trophies !== undefined) member.trophies = stats.trophies;
                if (stats.level !== undefined) member.level = stats.level;
                if (stats.league !== undefined) member.league = stats.league;
                if (stats.name !== undefined) member.name = stats.name;

                clan.trophies = clan.members.reduce((sum, m) => sum + (m.trophies || 0), 0);
                clan.markModified('members');
                await clan.save();
            }
        }
    }
}

function buildMemberEntry(player, role) {
    return {
        highID: player.highID,
        lowID: player.lowID,
        name: player.name || '',
        role, // 1 = Member, 2 = Leader, 3 = Elder, 4 = Co-Leader
        trophies: player.trophies || 0,
        level: player.level || 1,
        league: player.league || 0,
        donated: 0,
        donationsReceived: 0
    };
}

function generateToken(n, callback) {
    require('crypto').randomBytes(n, function (err, buffer) {
        callback(buffer.toString('hex'))
    })
}
