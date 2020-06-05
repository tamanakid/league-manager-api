const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const playerLeagueStatsSchema = new mongoose.Schema({

	player: {
		type: Schema.Types.ObjectId,
		ref: 'player',
		required: true,
	},

	league: {
		type: Schema.Types.ObjectId,
		ref: 'league',
		required: true,
	},

	team: {
		type: Schema.Types.ObjectId,
		ref: 'team',
		required: true,
	},

	appearances: {
		type: Number,
		default: 0,
	},

	goals: {
		type: Number,
		default: 0,
	},

	yellowCards: {
		type: Number,
		default: 0,
	},

	redCards: {
		type: Number,
		default: 0,
	},

});


playerLeagueStatsSchema.index({ league: 1, player: 1 }, { unique: true });


module.exports = mongoose.model('player-league-stats', playerLeagueStatsSchema);