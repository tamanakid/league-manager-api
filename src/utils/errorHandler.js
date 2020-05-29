const path = require('path');
const glob = require('glob');

const { GLOBAL_SERVER_ERROR } = require('@/utils/globalResponses').resNames;
const globalResponses = require('@/utils/globalResponses').responses



let responses = {
	...globalResponses,
};

glob.sync(path.resolve("src/modules/**/utils/*+(Responses).js")).forEach((filename) => {

	let name = filename.split('Controller')[0].split('/').pop();
	let moduleResponses = require(path.resolve(filename)).responses;

	responses =  { ...responses, ...moduleResponses };
});

// console.log(responses);



const errorHandler = (error, req, res, next) => {
	console.log('>> ERROR:', error);

	if (responses[error]) {
		responses[error](res);
	} else {
		responses[GLOBAL_SERVER_ERROR](res);
	}
}



module.exports = errorHandler;