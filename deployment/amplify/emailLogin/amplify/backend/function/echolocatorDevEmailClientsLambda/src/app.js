/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authEcholocatorDevEmailAuthUserPoolId = process.env.AUTH_ECHOLOCATORDEVEMAILAUTH_USERPOOLID

Amplify Params - DO NOT EDIT */

var AWS = require('aws-sdk')
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/clients', function(req, res) {
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/clients/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call to sub path succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/clients', function(req, res) {
  AWS.config.update({region: 'us-east-1'});
  var cognito = new AWS.CognitoIdentityServiceProvider();
  var username = req.body.email;
  var voucher = req.body.voucher;
  if (!username) {
    res.json({error: 'Missing user email in POST body'});
    return;
  }
  if (!voucher) {
    res.json({error: 'Missing user voucher in POST body'});
    return;
  }
  // get Cognito user pool ID from CloudFront env parameters
  var userPool = process.env.AUTH_ECHOLOCATORDEVEMAILAUTH_USERPOOLID;
  var params = {
    UserPoolId: userPool,
    Username: username
  };
  cognito.adminGetUser(params, function(err, data) {
    if (err && err.code === 'UserNotFoundException') {
      params['UserAttributes'] = [{
        Name: 'custom:voucher',
        Value: voucher
      }];
      cognito.adminCreateUser(params, function(err, data) {
        if (err) {
          console.log('Error creating user', err);
        } else {
          console.log('Successfully created user', data);
          res.json({data, url: req.url});
        }
      });
    } else if (err) {
      res.json({error: err});
    } else {
      console.log('User ' + username + ' already exists');
      res.json({error: 'User ' + username + ' already exists'});
    }
  });
});

app.post('/clients/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/clients', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/clients/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/clients', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/clients/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
