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
	
});


teamSchema.index({ admin: 1 });
teamSchema.index({ admin: 1, name: 1 }, { unique: true });


module.exports = mongoose.model('team', teamSchema);