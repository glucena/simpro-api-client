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

## Service method

### describeService

Describes a service, identified by name.


```
var clientRequest = client.describeService(wsdl, 'getSIMs');
clientRequest.on('error', function(data) { console.log("FAIL!!"); console.log(data);});
clientRequest.on('done', function(data) { console.log("OK!"); console.log(data);});

// Returns:
// OK!
// { input: 
//   { getSIMsRequest: 
//      { nsName: 'xsd:complexType',
//        namespace: 'tns',
//        name: 'complexType',
//       children: [Object],
//        xmlns: 'http://simpro4.wirelesslogic.com/api/',
//        valueKey: '$value',
//        xmlKey: '$xml',
//        ignoredNamespaces: [Object],
//        '$name': 'GetSIMsRequest' } },
//  output: 
//   { return: 
//      { nsName: 'xsd:complexType',
//       namespace: 'tns',
//        name: 'complexType',
//        children: [Object],
//        xmlns: 'http://simpro4.wirelesslogic.com/api/',
//        valueKey: '$value',
//        xmlKey: '$xml',
//        ignoredNamespaces: [Object],
//        '$name': 'GetSIMsResponse' } } }

```

### getSIMs

### getSIMUsage
