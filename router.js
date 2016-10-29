
var mc = require("./control/messageControl");
// var moc = require("./control/messageOperateControl");
var greeting = require("./control/greetingControl");
var gr = require("./control/graphicControl");

var router = function(app, logmessages) {
    app.post('/api/greeting', greeting.greeting);
    app.post('/api/message', mc.message);
    // app.post('/api/messageOperate', moc.messageOperate);
    app.get('/api/graphic', gr.graphic);
};

module.exports = router;