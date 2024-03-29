const account = require('./account/lib.js');

module.exports = function (app) {
	app.post('/get', account.get);
    app.post('/login', account.login);
    app.post('/signup', account.signup);
    app.post('/update', account.update);
}