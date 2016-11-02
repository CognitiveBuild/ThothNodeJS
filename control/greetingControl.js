'use strict';
var http = require('http');

var greetingControl = {
    greeting: function greetingControl(req, res) {

        var INI_GREETING_WORDS = "Hello";

        // REST API calling: get user info
        // Suppose the api request like {id:[001,002], dept:"672"}
        // Suppose the api response like {{id:001,name:Derek,industry:Insurance}, {id:002, name:Michael,industry:Finance}}
        // var user_id = req.body.user_id;

        var options = {
            host: 'testapiprovider.mybluemix.net',
             // host: '127.0.0.1',
            // port:6001, 
            path: '/userInfo', 
            method: 'POST', 
            headers: {'Content-Type': 'application/json' }
        };

        var userInfoReq = http.request(options, function(userInfoRes) {
            userInfoRes.setEncoding('utf8');
            userInfoRes.on('data', function (data) {

                var userInfo = JSON.parse(data);
                var greeting_res_text = "Hello "

                var nameStr = "";
                for(var i=0;i<userInfo.length;i++){
                    nameStr += userInfo[i].name;
                    nameStr += ", "
                }

                greeting_res_text += nameStr;

                greeting_res_text += "Nice to meet you!"

                res.json({"output":{text:greeting_res_text},"context":{"default_counter": 0}});

            });
        });
        // write data to request body
        userInfoReq.write(JSON.stringify(req.body));
        userInfoReq.end();

    }
}

module.exports = greetingControl;