# simpro-api-client

Node module that reduce the complexity of dealing with SimPRO API, wich is a SOAP based and has a lot of services and params that can drive you mad.

## Installation


## Usage

The usage is simple, just create a client object providing authentication setting and you can use the API methods.

```
var SIMProAPIClient = require('simpro-api-client').Client;
var client = new SIMProAPIClient( { auth: { method: 'Basic', 
                                            user: 'user',
                                            password: 'password' } } );
// client is ready to use
```

## Module
