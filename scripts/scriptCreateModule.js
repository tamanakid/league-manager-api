const fs = require('fs');
const path = require('path');



const args = process.argv.slice(2);

if (args.length !== 1) {
	console.log("Error creating module: provide module name as only argument");

	fs.promises.open(__dirname + "/TestModel.js", fs.constants.O_CREAT).then((file) => {
		fs.promises.chmod(__dirname + "/TestModel.js", 0o666).then(() => {
			file.write('data to append', 'utf8').then(() => {
				console.log("Cool");
			})
			.catch((err) => {
				console.log(err);
			});
		});
	});


} else {

	const moduleName = args[0];
	const moduleNameCapitalized = moduleName[0].toUpperCase() + moduleName.slice(1);

	fs.mkdirSync(path.resolve("src/modules/" + moduleName));
	fs.mkdirSync(path.resolve("src/modules/" + moduleName + "/models"));
	fs.mkdirSync(path.resolve("src/modules/" + moduleName + "/operations"));
	fs.mkdirSync(path.resolve("src/modules/" + moduleName + "/services"));
	fs.mkdirSync(path.resolve("src/modules/" + moduleName + "/utils"));
	
	// console.log(fs.constants.O_CREAT);
	fs.promises.open(path.resolve("src/modules/" + moduleName + "/models/" + moduleNameCapitalized + "Model.js"), fs.constants.O_CREAT)
	
	.then((file) => {
		console.log("Correct file creation");
	})

	.catch(() => {
		console.log("Incorrect file creation");
	});
	
	

}



// fs.mkdir()