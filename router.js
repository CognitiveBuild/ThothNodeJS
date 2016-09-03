
var mc = require("./control/messagecontrol");
var gr = require("./control/graphiccontrol");

var router = function(app, logs) {
    app.post('/api/message', mc.message);
    app.get('/api/graphic', gr.graphic);
};

module.exports = router;