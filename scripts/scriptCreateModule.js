const fs = require('fs');
const path = require('path');


const createModuleFile = (filepath, data) => {
	return fs.promises.writeFile( filepath,	data );
}



const args = process.argv.slice(2);

if (args.length !== 1) {
	console.log("League Manager API >> Error creating module: provide module name as only argument");
} else {

	const moduleName = args[0];
	const moduleNameCapitalized = moduleName[0].toUpperCase() + moduleName.slice(1);
	const moduleNameUppercase = moduleName.toUpperCase()
	const modulePath = "src/modules/" + moduleName;

	fs.mkdirSync(path.resolve(modulePath));
	fs.mkdirSync(path.resolve(modulePath + "/models"));
	fs.mkdirSync(path.resolve(modulePath + "/operations"));
	fs.mkdirSync(path.resolve(modulePath + "/services"));
	fs.mkdirSync(path.resolve(modulePath + "/utils"));

	// fs.promises.open(path.resolve(modulePath + "/models/" + moduleNameCapitalized + "Model.js"), fs.constants.O_CREAT)

	const modelFilename = modulePath + "/models/" + moduleNameCapitalized + "Model.js";
	const modelData = "const mongoose = require('mongoose');\r\n\r\nconst " + moduleName + "Schema = new mongoose.Schema({});\r\n\r\nmodule.exports = mongoose.model('" + moduleName + "', " + moduleName + "Schema);";

	const controllerFilename = modulePath + "/" + moduleName + "Controller.js";
	const controllerData = "const express = require('express');\r\n\r\n// Import Operations and Services\r\n\r\nlet router = express.Router();\r\n\r\n// Define routes\r\n\r\nmodule.exports = router;";

	const responsesFilename = modulePath + "/utils/" + moduleName + "Responses.js";
	const responsesData1 = "const resNames = {\r\n\t" + moduleNameUppercase + "_NOT_FOUND: '" + moduleNameUppercase + "_NOT_FOUND',\r\n};\r\n\r\n";
	const responsesData2 = "const responses = {\r\n\t[resNames." + moduleNameUppercase + "_NOT_FOUND]: (res) => {\r\n\t\tres.status(404).json({\r\n\t\t\tmessage: 'The " + moduleName + " was not found in the database',\r\n\t\t});\r\n\t},\r\n};\r\n\r\n"
	const responsesData3 = "module.exports = { responses, resNames };"
	const responsesData = responsesData1 + responsesData2 + responsesData3;

	const docsFilename = modulePath + "/" + moduleName + "Docs.md";
	const docsData = "## " + moduleNameCapitalized + " Module Endpoints";


	Promise.all([
		createModuleFile(modelFilename, modelData),
		createModuleFile(controllerFilename, controllerData),
		createModuleFile(responsesFilename, responsesData),
		createModuleFile(docsFilename, docsData),
	])

	.then(() => {
		console.log("League Manager API >> Module " + moduleName + " created correctly.");
	})
	
	.catch((err) => {
		console.log("League Manager API >> Some error resulted in attempts of file creations\r\n", err);
		fs.rmdirSync(modulePath);
	});
}
