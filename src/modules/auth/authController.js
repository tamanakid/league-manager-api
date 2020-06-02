const createController = require('@/utils/createController');

const checkUserExistsService = require('@auth/services/checkUserExistsService');
const signupOperation = require('@auth/operations/signupOperation');
const loginOperation = require('@auth/operations/loginOperation');


let controller = createController();



controller.endpoint('post', '/signup', [checkUserExistsService.checkUsernameAndEmail, signupOperation]);

controller.endpoint('post', '/login', [checkUserExistsService.checkUsernameOrEmail, loginOperation]);



module.exports = controller.router;
