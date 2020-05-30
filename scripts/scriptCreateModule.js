const fs = require('fs');
const path = require('path');



const args = process.argv.slice(2);

if (args.length !== 1) {
	console.log("Error creating module: provide module name as only argument");
	fs.promises.writeFile(
		__dirname + "/test.js",
		"data\r\nmore data"
	)
	
	.then(() => {
		console.log("Cool")
	})
	.catch((err) => {
		console.log("Not Cool:", err)
	});

} else {

	const moduleName = args[0];
	const moduleNameCapitalized = moduleName[0].toUpperCase() + moduleName.slice(1);
	const moduleNameUppercase = moduleName.toUpperCase()

	fs.mkdirSync(path.resolve("src/modules/" + moduleName));
	fs.mkdirSync(path.resolve("src/modules/" + moduleName + "/models"));
	fs.mkdirSync(path.resolve("src/modules/" + moduleName + "/operations"));
	fs.mkdirSync(path.resolve("src/modules/" + moduleName + "/services"));
	fs.mkdirSync(path.resolve("src/modules/" + moduleName + "/utils"));

	// fs.promises.open(path.resolve("src/modules/" + moduleName + "/models/" + moduleNameCapitalized + "Model.js"), fs.constants.O_CREAT)
	fs.promises.writeFile(
		"src/modules/" + moduleName + "/models/" + moduleNameCapitalized + "Model.js",
		"const mongoose = require('mongoose');\r\n\r\nconst " + moduleName + "Schema = new mongoose.Schema({});\r\n\r\nmodule.exports = mongoose.model('" + moduleName + "', " + moduleName + "Schema);"
	)
	
	.then(() => {
		console.log("Cool")
	})
	.catch((err) => {
		console.log("Not Cool:", err)
	});

	fs.promises.writeFile(
		"src/modules/" + moduleName + "/" + moduleName + "Controller.js",
		"const express = require('express');\r\n\r\n// Import Operations and Services\r\n\r\nlet router = express.Router();\r\n\r\n// Define routes\r\n\r\nmodule.exports = router;"
	)

	.then(() => {
		console.log("Cool")
	})
	.catch((err) => {
		console.log("Not Cool:", err)
	});

	str1 = "const resNames = {\r\n\t" + moduleNameUppercase + "_NOT_FOUND: '" + moduleNameUppercase + "_NOT_FOUND',\r\n};\r\n\r\n"
	str2 = "const responses = {\r\n\t[resNames." + moduleNameUppercase + "_NOT_FOUND]: (res) => {\r\n\t\tres.status(404).json({\r\n\t\t\tmessage: 'The " + moduleName + " was not found in the database',\r\n\t\t});\r\n\t},\r\n};\r\n\r\n"
	str3 = "module.exports = { responses, resNames };"
	
	fs.promises.writeFile(
		"src/modules/" + moduleName + "/utils/" + moduleName + "Responses.js",
		str1 + str2 + str3
	)

	.then(() => {
		console.log("Cool")
	})
	.catch((err) => {
		console.log("Not Cool:", err)
	});	
}