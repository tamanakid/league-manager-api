const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const playerSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
	},

	team: {
		type: Schema.Types.ObjectId,
		ref: 'team',
		required: true,
	},

	shirtNumber: {
		type: Number,
		required: true,
	},

	position: {
		type: String,
		required: true,
	}

});


playerSchema.index({ team: 1 });


module.exports = mongoose.model('player', playerSchema);