
'use strict';

var watson = require( 'watson-developer-cloud' );  // watson sdk

// Create the service wrapper
var conversation = watson.conversation( {
    url: 'https://gateway.watsonplatform.net/conversation/api',
    username: process.env.CONVERSATION_USERNAME || '<username>',
    password: process.env.CONVERSATION_PASSWORD || '<password>',
    version_date: '2016-07-11',
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
        // if ( logs ) {
        //     // If the logs db is set, then we want to record all input and responses
        //     id = uuid.v4();
        //     logs.insert( {'_id': id, 'request': input, 'response': response, 'time': new Date()});
        // }
        return response;
    }
    if ( response.intents && response.intents[0] ) {
        var intent = response.intents[0];
        // Depending on the confidence of the response the app can return different messages.
        // The confidence will vary depending on how well the system is trained. The service will always try to assign
        // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
        // user's intent . In these cases it is usually best to return a disambiguation message
        // ('I did not understand your intent, please rephrase your question', etc..)
        if ( intent.confidence >= 0.75 ) {
            responseText = 'I understood your intent was ' + intent.intent;
        } else if ( intent.confidence >= 0.5 ) {
            responseText = 'I think your intent was ' + intent.intent;
        } else {
            responseText = 'I did not understand your intent';
        }
    }
    response.output.text = responseText;
    // if ( logs ) {
    //     // If the logs db is set, then we want to record all input and responses
    //     id = uuid.v4();
    //     logs.insert( {'_id': id, 'request': input, 'response': response, 'time': new Date()});
    // }
    return response;
}
//
var messageControl = {

    message: function messageControl(req, res) {
        var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
        if ( !workspace || workspace === '<workspace-id>' ) {
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
            input: {}
        };
        if ( req.body ) {
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
    },

    messageWithStringParam: function messageWithStringParam(inputParam) {
        var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
        if ( !workspace || workspace === '<workspace-id>' ) {
            return JSON.stringify( {
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
            input: inputParam
        };

        // Send the input to the conversation service
        conversation.message( payload, function(err, data) {
            if ( err ) {
                return JSON.stringify( err);
            }
            return JSON.stringify( data );
        } );
    },

    getMessageOutputText: function getMessageOutputText(inputText) {
        var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
        if ( !workspace || workspace === '<workspace-id>' ) {
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
            input: inputText
        };
        
        // Send the input to the conversation service
        conversation.message( payload, function(err, data) {
            if ( err ) {
                return res.status( err.code || 500 ).json( err );
            }
            return data.output.text;
        } );
    }

};

module.exports = messageControl;