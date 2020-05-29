const mongoose = require('mongoose');


const teamSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true
	},

	admin: {
    type: Schema.Types.ObjectId,
    ref: 'user',
	},

	leagues: [
		{
			type: Schema.Types.ObjectId,
			ref: 'league'
		}
	]
	
	
});


module.exports = mongoose.model('team', teamSchema);