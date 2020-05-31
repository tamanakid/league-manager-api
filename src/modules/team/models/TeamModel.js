const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const teamSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true
	},

	admin: {
    type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},

	location: {
		type: String,
	},

	leagues: [
		{
			type: Schema.Types.ObjectId,
			ref: 'league'
		}
	],

	color1: {
		type: String,
	},
	
	color2: {
		type: String,
	},

	players: [
		{
			type: Schema.Types.ObjectId,
			ref: 'player'
		}
	]
	
});


module.exports = mongoose.model('team', teamSchema);