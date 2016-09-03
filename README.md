1. API: /api/message

1.1 URL：
http://[Domain]/api/message
[Sample] http://helloconversation.mybluemix.net/api/message

1.2	Pattern：
json

1.3	HTTP Request Method：
POST

1.4 Input Param:
1.4.1  Param Name：input     Necessary or not：Yes
1.4.2  Param Name：context     Necessary or not：No

[Sample]
{
  "input": {
    "text": "hello"
  },
  "context": {
    "conversation_id": "6e71bb87-ac67-448c-ae8c-28b422b9c9d8",
    "system": {
      "dialog_stack": [
        "root"
      ],
      "dialog_turn_counter": 2,
      "dialog_request_counter": 2
    },
    "defaultCounter": 0
  }
}

2. API: /api/graphic

2.1 URL
http://[Domain]/api/graphic
[Sample] http://helloconversation.mybluemix.net/api/graphic

2.2	pattern
json

2.3	HTTP Request Method
GET

2.4 Input Param:
No.