
'use strict';
var graphicControl = {
    graphic: function graphicControl(req, res) {
        var result = { name: 'Derek', phone: 60470 }
        res.send(result);
    }
}

module.exports = graphicControl;