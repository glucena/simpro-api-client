var soap = require('soap'),
    util = require("util"),
    events = require("events");


function Client ( options ) {
    var self = this;
    this.options = options || {};
    this.auth = this.options.auth || {};
    
    // Client Request to be passed to ConnectManager and returned
    // for each REST method invocation
    var ClientRequest = function(){
      events.EventEmitter.call(this);
    };

    util.inherits(ClientRequest, events.EventEmitter);

    var Util = {
      
      createAuthHeaders: function () {
        var result = {};
        // if service requires authentication, create Authorization headers
        if ( self.auth.method && self.auth.method === 'Basic' ){
          if ( self.auth.user && self.auth.password ) {
            result.Authorization = "Basic " + new Buffer( [ self.auth.user,
                                                            self.auth.password].join(":") )
                                                        .toString("base64");
          }
        } else {
          self.emit('error', 'Authentication method is not implemented');
        }

        return result;
      },

      describe : function (url, service, callback) {
        soap.createClient(url, { wsdl_headers: Util.createAuthHeaders() }, function(err, SOAPClient) {
          if ( err ){
            callback( err );
            return;
          }
          callback( null, SOAPClient.describe().customerV2Service.customerV2Port[service]);
        });
      },

      connect : function ( url, service, args, callback, clientRequest ) {

        soap.createClient(url, { wsdl_headers: Util.createAuthHeaders() }, function(err, SOAPClient) {
          if ( err ){
            callback( err );
            return;
          }
          if ( self.auth.method && self.auth.method === 'Basic' ){
            if ( self.auth.user && self.auth.password ) {
              SOAPClient.setSecurity( new soap.BasicAuthSecurity( self.auth.user, 
                                                                  self.auth.password ) );
            }
          }

          SOAPClient[service]( args, function( err, result ) {
            if ( err ) {
              callback( err );
              return;
            }

            callback( null, result.return.sims.item );
          });
        });
      },

    };

    var sendRequest = function( url, service, args, callback ) {
      var clientRequest = new ClientRequest();
      Util.connect( url, service, args, callback, clientRequest);
      return clientRequest;
    };

    this.test = function () {
      console.log(Util.createAuthHeaders());
    };

    this.testPete = function () {
      console.log(self);
      self.emit('error', 'PETE');
    };

    this.describeService = function( url, service, callback ) { 
      Util.describe( url, service, callback);
    };

    this.getSIMs = function( url, args, callback ) {
      console.log("LLAMANDO A getSIMs");
      return sendRequest( url, 'getSIMs', args, callback );
    };

    this.getSIMUsage = function( url, args, callback ) { 
      console.log("LLAMANDO A getSIMUsage");
      return sendRequest( url, 'getSIMUsage', args, callback );
    };




}

var ConnectManager = {

};

// event handlers for client
util.inherits(Client, events.EventEmitter);

exports.Client = Client;
