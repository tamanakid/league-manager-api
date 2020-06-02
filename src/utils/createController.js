const express = require('express');


const createController = () => {
	
	let router = express.Router();

	function endpoint (method, routePath, callChain) {
		router[method](routePath, callChain);
	}	

	return {
		router,
		endpoint,
	};
}



module.exports = createController;