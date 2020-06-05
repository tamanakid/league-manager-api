const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const matchSchema = new mongoose.Schema({

	league: {
		type: Schema.Types.ObjectId,
		ref: 'league',
		required: true,
	},

	isPlayed: {
		type: Boolean,
		default: false,
	},

	matchweek: {
		type: Number,
		required: true,
	},

	date: {
		type: String,
		default: null,
	},

	venue: {
		type: String,
		default: null,
	},

	homeTeam: {
		_id: {
			type: Schema.Types.ObjectId,
			ref: 'team',
			required: true,
		},
		teamName: {
			type: String,
			required: true,
		},
		teamAbbr: {
			type: String,
			required: true,
		},
	},

	awayTeam: {
		_id: {
			type: Schema.Types.ObjectId,
			ref: 'team',
			required: true,
		},
		teamName: {
			type: String,
			required: true,
		},
		teamAbbr: {
			type: String,
			required: true,
		},
	},

	homeApps: [
		{
			type: Schema.Types.ObjectId,
			ref: 'player',
		}
	],

	awayApps: [
		{
			type: Schema.Types.ObjectId,
			ref: 'player',
		}
	],

	homeGoals: {
		type: Number,
		default: null,
	},

	awayGoals: {
		type: Number,
		default: null,
	},

	homeGoalscorers: [
		{
			_id: false,
			player: {
				type: Schema.Types.ObjectId,
				ref: 'player',
				required: true,
			},
			minute: {
				type: Number,
				required: true,
			},
		}
	],

	awayGoalscorers: [
		{
			_id: false,
			player: {
				type: Schema.Types.ObjectId,
				ref: 'player',
				required: true,
			},
			minute: {
				type: Number,
				required: true,
			},
		}
	],

});



matchSchema.index({ league: 1, homeTeam: 1 });
matchSchema.index({ league: 1, awayTeam: 1 });
matchSchema.index({ league: 1, matchweek: 1 });
matchSchema.index({ date: 1, venue: 1 }, { unique: true });


module.exports = mongoose.model('match', matchSchema);