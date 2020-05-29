const path = require('path');
const glob = require('glob');

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
	responses[error](res);
}



module.exports = errorHandler;