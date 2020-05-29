require('module-alias/register');
const path = require('path');
const glob = require('glob');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const moduleAlias = require('module-alias');

const errorHandler = require('@/utils/errorHandler');



app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




/* CORS Habilitation */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT', 'POST', 'DELETE', 'PATCH');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});


/* Controllers instantiation */
const controllers = glob.sync(path.join(__dirname, '/modules/**/*+(Controller).js')).map((filename) => {

	let name = filename.split('Controller')[0].split('/').pop();
	moduleAlias.addAlias(`@${name}`, `${__dirname}/modules/${name}`);
	
	let router = require(path.resolve(filename));

	return { name, router };
});

controllers.forEach(({ name, router }) => {
	app.use(`/api/${name}`, router);
});




/* Error Handling */
app.use(errorHandler);




/* Database Connection and server socket instantiation */
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
	console.log('connected to database '/* , res */);
	
	/* Server Instantiation */
	var port = process.env.PORT || 8100;
	app.listen(port, () => {
		console.log('Express server listening on port ' + port);
	});
}).catch((err) => {
	console.log('ERROR: connecting to Database. ' + err);
});

