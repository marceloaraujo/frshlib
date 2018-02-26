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

        createTicket: function(ticketData) {
            var _this = this;
            return new Promise(function(resolve, reject) {
                if (ticketData == undefined ||
                    ticketData == "") {
                    reject("Informe os dados para criação do ticket!");
                }
                if(_this.freshDeskUrl == "" ||
                   _this.freshDeskKey == "") {
                    reject("Por favor, informe os dados de login/senha e URL do Freshdesk!");
                }
                var ticket = JSON.stringify(ticketData);
                jQuery.ajax({
                    url: _this.freshDeskUrl + "/api/v2/tickets",
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    headers: {
                        "Authorization": "Basic " + btoa(_this.freshDeskKey + ":x")
                    },
                    data: ticket,
                    success: function(data) {
                        resolve(data);
                    },
                    error: function(error) {
                        reject(error.responseJSON);
                    }
                })
            });
        },

        viewTicket: function(idTicket) {
            var _this = this;
            return new Promise(function(resolve, reject) {
                if(idTicket == undefined ||
                   idTicket == 0 ||
                   idTicket == "") {
                    reject("Informe o id do ticket!");
                }
                jQuery.ajax({
                    url: _this.freshDeskUrl + "/api/v2/tickets/" + idTicket,
                    type: 'GET',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    headers: {
                        "Authorization": "Basic " + btoa(_this.freshDeskKey + ":x")
                    },
                    success: function(data) {
                        resolve(data);
                    },
                    error: function(error) {
                        reject(error.responseJSON);
                    }
                });
            });
        }
    };

})();

// (function(window) {

//     function frshlib() {
//         var _frshlib = {};
//         return _frshlib;
//     }

//     if(typeof(window.frshlib) === 'undefined') {
//         window.frshlib = frshlib();
//     }


// })(window);