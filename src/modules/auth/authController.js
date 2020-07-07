const createController = require('@/utils/createController');

const checkUserExistsService = require('@auth/services/checkUserExistsService');
const signupOperation = require('@auth/operations/signupOperation');
const loginOperation = require('@auth/operations/loginOperation');
const refreshTokenOperation = require('@auth/operations/refreshTokenOperation');


let controller = createController();



controller.endpoint('post', '/signup', [checkUserExistsService.checkUsernameAndEmail, signupOperation]);

controller.endpoint('post', '/login', [checkUserExistsService.checkUsernameOrEmail, loginOperation]);

controller.endpoint('post', '/refresh-token', [refreshTokenOperation]);



module.exports = controller.router;
