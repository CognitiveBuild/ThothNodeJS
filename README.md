# ThothNodeJS
ThothNodeJS provides RESTful services of Thoth. This is the project of a Conversational Agent, the Robot Brain of GBS Innovation Center

# API
## Conversation
POST: `/api/message`

Content-Type: `application/json`

### HTTP Request body: 
<table>
    <tr>
        <th>Parameter</th>
        <th>Type</th>
        <th>Required</th>
        <th>Note</th>
    </tr>
    <tr>
        <td>input</td>
        <td>object</td>
        <td>required</td>
        <td></td>
    </tr>
    <tr>
        <td>context</td>
        <td>object</td>
        <td></td>
        <td>The context is generated from Watson Conversaion</td>
    </tr>
</table>

#### `input` scheme: 
<table>
    <tr>
        <th>Parameter</th>
        <th>Type</th>
        <th>Required</th>
    </tr>
    <tr>
        <td>text</td>
        <td>string</td>
        <td>required</td>
    </tr>
</table>

#### `context` scheme: 
<table>
    <tr>
        <th>Parameter</th>
        <th>Type</th>
        <th>Required</th>
    </tr>
    <tr>
        <td>conversation_id</td>
        <td>string</td>
        <td>required</td>
    </tr>
    <tr>
        <td>system</td>
        <td>object</td>
        <td>required</td>
    </tr>
    <tr>
        <td>defaultCounter</td>
        <td>integer</td>
        <td>required</td>
    </tr>
</table>

###### `system` scheme: 
<table>
    <tr>
        <th>Parameter</th>
        <th>Type</th>
        <th>Required</th>
    </tr>
    <tr>
        <td>dialog_stack</td>
        <td>array&lt;string&gt;</td>
        <td>required</td>
    </tr>
    <tr>
        <td>dialog_turn_counter</td>
        <td>integer</td>
        <td>required</td>
    </tr>
    <tr>
        <td>dialog_request_counter</td>
        <td>integer</td>
        <td>required</td>
    </tr>
</table>


## Sample of HTTP request body: 
```JSON
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
```

## Graphic
GET: `/api/graphic`

Content-Type: `application/json`


#License
Copyright 2016 GCG GBS CTO Office under [the Apache 2.0 license](LICENSE).
