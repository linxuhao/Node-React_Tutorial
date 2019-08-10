const organization = require('./organization/lib.js');

module.exports = function (app) {
    app.post('/get', organization.get);
    app.post('/add', organization.add);
    app.post('/remove', organization.remove);
    app.post('/update', organization.update);
}