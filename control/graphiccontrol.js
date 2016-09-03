
var graphicControl = {
    graphic: function messageControl(req, res) {
        var result = { name: 'Derek', phone: 60470 }
        res.send(result);
    }
}

module.exports = graphicControl;