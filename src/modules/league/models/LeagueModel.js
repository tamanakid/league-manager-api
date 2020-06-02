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


leagueSchema.index({ admin: 1 });
leagueSchema.index({ admin: 1, name: 1 }, { unique: true });


module.exports = mongoose.model('league', leagueSchema);