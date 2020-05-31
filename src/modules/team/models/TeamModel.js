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
		required: false,
	},

	leagues: [
		{
			type: Schema.Types.ObjectId,
			ref: 'league'
		}
	],

	color1: {
		type: String,
		required: false,
	},
	
	color2: {
		type: String,
		required: false,
	},

	players: [
		{
			type: Schema.Types.ObjectId,
			ref: 'player'
		}
	]
	
});


module.exports = mongoose.model('team', teamSchema);