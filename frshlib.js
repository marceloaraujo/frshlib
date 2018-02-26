/** 
 * Frshlib: funções básicas para consumir métodos da API do Freshdesk
 * A ideia é criar essa lib para não precisar reescrever código a cada
 * app criado para o Freshdesk 😎
*/

var frshlib = (function(){
    console.log("IS RUNNING!!!");
    return {
        freshDeskUrl: "",
        freshDeskKey: "",
        init: function(freshDeskUrl, freshDeskKey){
            this.freshDeskUrl = freshDeskUrl;
            this.freshDeskKey = freshDeskKey;
        },

        validateFreshdeskInfos: function() {
            console.log(this.freshDeskUrl);
            console.log(this.freshDeskKey);
            if((this.freshDeskUrl === "" || this.freshDeskUrl == undefined) ||
               (this.freshDeskKey === "") || this.freshDeskKey == undefined) {
                   return false;
            }
            return true;
        },

        createTicket: function(ticketData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets";
            return _this._callPromise(url, "POST", ticketData);
        },

        viewTicket: function(idTicket) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket;
            return _this._callPromise(url, "GET");
        },

        viewAllTickets: function() {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets";
            return _this._callPromise(url, "GET");
        },

        _callPromise: function(url, method, data) {
            var _this = this;
            return new Promise(function(resolve, reject) {
                if(!_this.validateFreshdeskInfos()) {
                    reject("Por favor, use a função init para enviar a URL e API Key do Freshdesk!");
                } else {
                    var dataPost = JSON.stringify(data);
                    jQuery.ajax({
                        url: url,
                        type: method,
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        headers: {
                            "Authorization": "Basic " + btoa(_this.freshDeskKey + ":x")
                        },
                        data: dataPost != undefined ? dataPost : "",
                        success: function(data) {
                            resolve(data);
                        },
                        error: function(error) {
                            reject(error);
                        }
                    });
                }
            });
        }
    };

})();