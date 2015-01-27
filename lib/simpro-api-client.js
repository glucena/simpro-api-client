var SoapClient = require('soap'),
    util = require("util"),
    events = require("events");


function Client ( options ) {
    var self = this;
    this.options = options || {};
    this.auth = this.options.auth || {};
    
    // Client Request to be passed to ConnectManager and returned
    // for each REST method invocation
    var ClientRequest =function(){
      events.EventEmitter.call(this);
    };

    util.inherits(ClientRequest, events.EventEmitter);

    var Util = {
      
      createAuthHeaders: function() {
        var result ={};
        // if service requires authentication, create Authorization headers
        if ( self.auth.method && self.auth.method === 'Basic' ){
          if ( self.auth.user && self.auth.password ) {
            result.Authorization = "Basic " + new Buffer([self.auth.user,
                                                          self.auth.password].join(":"))
                                            .toString("base64");
          }
        } else {
          self.emit('error', 'Authentication method is not implemented');
        }

        return result;
      },

    };

    self.test = function () {
      console.log(Util.createAuthHeaders());
    };

    self.testPete = function () {
      console.log(self);
      self.emit('error', 'PETE');
    };
}

// event handlers for client
util.inherits(Client, events.EventEmitter);

exports.Client = Client;
