const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../config.json')

//Creating schema
const playersSchema = new Schema({
    highID: {
        type: Number,
        required: true
    },
    lowID: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: 'You'
    },
    village: {
        type: String,
        default: ''
    },
    nameChangesCount: {
        type: Number,
        default: 0
    },
    facebookID: {
        type: String,
        default: ''
    },
    trophies: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingScore
    },
    highestTrophies: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingScore
    },
    shieldDurationSeconds: {
        type: Number,
        default: 0
    },
    guardDurationSeconds: {
        type: Number,
        default: 0
    },
    personalDurationSeconds: {
        type: Number,
        default: 0
    },
    attackRating: {
        type: Number,
        default: 0
    },
    attackKFactor: {
        type: Number,
        default: 0
    },
    cumulativePurchasedDiamonds: {
        type: Number,
        default: 0
    },
    attackWinCount: {
        type: Number,
        default: 0
    },
    attackLoseCount: {
        type: Number,
        default: 0
    },
    defendWinCount: {
        type: Number,
        default: 0
    },
    defendLoseCount: {
        type: Number,
        default: 0
    },
    allianceCastleGold: {
        type: Number,
        default: 0
    },
    allianceCastleMana: {
        type: Number,
        default: 0
    },
    allianceCastleDarkMana: {
        type: Number,
        default: 0
    },
    league: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: config.Player.StartDefault ? 1 : config.Player.StartingLevel
    },
    xpPoints: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingExperience
    },
    gold: {
        type: Number,
        default: config.Player.StartDefault ? 750 : config.Player.StartingResources.Gold
    },
    mana: {
        type: Number,
        default: config.Player.StartDefault ? 750 : config.Player.StartingResources.Mana
    },
    darkMana: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingResources.DarkMana
    },
    diamonds: {
        type: Number,
        default: config.Player.StartDefault ? 500 : config.Player.StartingResources.Gold
    },
    victories: {
        type: Number,
        default: 0
    },
    tutorialSteps: {
        type: Number,
        default: 0
    },
    inClan: {
        type: Number,
        default: 0
    },
    clan: {
        ClanHighID: {
            type: Number,
            default: 0
        },
        ClanLowID: {
            type: Number,
            default: 1
        },
        ClanName: {
            type: String,
            default: 'Clashers'
        },
        ClanBadge: {
            type: Number,
            default: 13000000
        },
        ClanRole: {
            type: Number,
            default: 0
        }
    }
})

mongoose.model('players', playersSchema);