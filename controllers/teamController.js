const team = require('./team/lib.js');

module.exports = function (app) {
    app.post('/get', team.get);
    app.post('/add', team.add);
    app.post('/remove', team.remove);
}