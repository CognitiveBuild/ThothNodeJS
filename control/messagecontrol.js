
'use strict';

var watson = require( 'watson-developer-cloud' );  // watson sdk

var CONVERSATION_SERVICE = 'conversation';
var CONVERSATION_ACCESS_ERROR = 'Sorry, you have no authority to use this conversation.';

function getConversationCredential() {
    if (process.env.VCAP_SERVICES) {
        var services = JSON.parse(process.env.VCAP_SERVICES);
        for (var service_name in services) {
            if (service_name.indexOf(CONVERSATION_SERVICE) === 0) {
                var service = services[service_name][0];
                return {
                    url: service.credentials.url,
                    username: service.credentials.username,
                    password: service.credentials.password
                };
            }
        }
    }
    return {};
};

// Create the service wrapper
var credential = getConversationCredential();

var conversation = watson.conversation( {
    url: credential.url,
    username: credential.username,
    password: credential.password,
    version_date:'2016-07-11',
    version: 'v1'
} );


/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
function updateMessage(input, response) {
    var responseText = null;
    var id = null;

    if ( !response.output ) {
        response.output = {};
    } else {
        if ( response.output.api ) {
            //TODO call REST API, Dummy source first
            var specialContent ={};
            specialContent.data=[
                {
                    'Name':'',
                    'Info':'',
                    'MimeList':[
                        {'Type':'vedio','URL':'http://www.runoob.com/try/demo_source/movie.mp4'},
                        {'Type':'graphic','URL':'http://www.smbc.co.jp/kojin/resources/images/index_logo03.jpg'}
                    ]
                }
            ];
            response.output.specialContent = specialContent;
        }
        return response;
    }
    if ( response.intents && response.intents[0] ) {
        var intent = response.intents[0];
        if ( intent.confidence >= 0.75 ) {
            responseText = 'I understood your intent was ' + intent.intent;
        } else if ( intent.confidence >= 0.5 ) {
            responseText = 'I think your intent was ' + intent.intent;
        } else {
            responseText = 'I did not understand your intent';
        }
    }
    response.output.text = responseText;

    return response;
}

//
var messageControl = {

    message: function messageControl(req, res) {

        var workspace = process.env.conversation_workspace_id;

        if ( !workspace || workspace === '' ) {
            return res.json( {
                'output': {
                    'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
                    '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' +
                    'Once a workspace has been defined the intents may be imported from ' +
                    '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
                }
            } );
        }
        var payload = {
            workspace_id: workspace,
            context: {},
            input: {},
        };
        if ( req.body ) {

            if ( req.body.accessKey!== process.env.conversation_access_key) {
                return res.status( 403 ).json( { error: CONVERSATION_ACCESS_ERROR } );
            }
            if ( req.body.input ) {
                payload.input = req.body.input;
            }
            if ( req.body.context ) {
                // The client must maintain context/state
                payload.context = req.body.context;
            }
        }
        // Send the input to the conversation service
        conversation.message( payload, function(err, data) {
            if ( err ) {
                return res.status( err.code || 500 ).json( err );
            }
            return res.json( updateMessage( payload, data ) );
        } );
    }

};

module.exports = messageControl;