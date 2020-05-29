const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leagueSchema = new Schema({

	name: {
		type: String,
		required: true
	},

	admin: {
    type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},

	location: {
		type: String,
		required: false,
		default: null,
	},

	numberOfTeams: {
		type: Number,
		required: false,
		default: null,
	},

	teams: [
		{
			type: Schema.Types.ObjectId,
			ref: 'team'
		}
	]
	
});


module.exports = mongoose.model('league', leagueSchema);