const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tableSchema = new mongoose.Schema({

	league: {
		type: Schema.Types.ObjectId,
		ref: 'league',
		required: true,
		unique: true,
	},

	teams: [
		{
			_id: {
				type: Schema.Types.ObjectId,
				ref: 'team',
				required: true,
			},
			teamName: { type: String, required: true },
			teamAbbr: { type: String, required: true },
			position: { type: Number, default: 0 },
			gamesPlayed: { type: Number, default: 0 },
			gamesWon: { type: Number, default: 0 },
			gamesDrawn: { type: Number, default: 0 },
			gamesLost: { type: Number, default: 0 },
			points: { type: Number, default: 0 },
			goalsFor: { type: Number, default: 0 },
			goalsAgainst: { type: Number, default: 0 },
			goalsDifference: { type: Number, default: 0 },
		}
	]

});


tableSchema.index({ league: 1 });


module.exports = mongoose.model('table', tableSchema);