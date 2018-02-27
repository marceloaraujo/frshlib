/** 
 * Frshlib: funções básicas para consumir métodos da API do Freshdesk
 * A ideia é criar essa lib para não precisar reescrever código a cada
 * app criado para o Freshdesk 😎
 * Made by Marcelo Araujo
 * Twitter: https://twitter.com/m_araujo01
 * 
*/

var frshlib = (function(){
    console.log("IS RUNNING!!!");
    return {
        freshDeskUrl: "",
        freshDeskKey: "",
        /**
         * Init client with Freshdesk URL and API key
         * @author Marcelo Araujo
         */
        init: function(freshDeskUrl, freshDeskKey){
            this.freshDeskUrl = freshDeskUrl;
            this.freshDeskKey = freshDeskKey;
        },

        validateFreshdeskInfos: function() {
            if((this.freshDeskUrl === "" || this.freshDeskUrl == undefined) ||
               (this.freshDeskKey === "") || this.freshDeskKey == undefined) {
                   return false;
            }
            return true;
        },

        /**
         * Create a ticket in Freshdesk
         * @author Marcelo Araujo
         */
        createTicket: function(ticketData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets";
            return _this._callPromise(url, "POST", ticketData);
        },

        /**
         * View a ticket by id
         * @author Marcelo Araujo
         */
        viewTicket: function(idTicket) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket;
            return _this._callPromise(url, "GET");
        },

        /**
         * View all tickets
         * @author Marcelo Araujo
         */
        viewAllTickets: function() {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets";
            return _this._callPromise(url, "GET");
        },

        /**
         * Update a ticket by id
         * @author Marcelo Araujo
         */
        updateTicket: function(idTicket, ticketData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket;
            return _this._callPromise(url, "PUT", ticketData);
        },

        /**
         * Delete a ticket by id
         * @author Marcelo Araujo
         */
        deleteTicket: function(idTicket) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket;
            return _this._callPromise(url, "DELETE");
        },

        /**
         * Create a reply in ticket
         * @author Marcelo Araujo
         */
        createReply: function(idTicket, replyData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket + "/reply";
            return _this._callPromise(url, "POST", replyData);
        },

        /**
         * Create a note in ticket
         * @author Marcelo Araujo
         */
        createNote: function(idTicket, noteData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket + "/notes";
            return _this._callPromise(url, "POST", noteData);
        },

        /**
         * Update a note by id
         * @author Marcelo Araujo
         */
        updateConversation: function(idNote, noteData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/conversations/" + idNote;
            return _this._callPromise(url, "PUT", noteData);
        },

        /**
         * Delete a conversation by id
         * @author Marcelo Araujo
         */
        deleteConversation: function(idConversation) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/conversations/" + idConversation;
            return _this._callPromise(url, "DELETE");
        },

        /**
         * Generic function to call API by URL.
         * This function is used in all functions above
         * @author Marcelo Araujo
         */
        _callPromise: function(url, method, data) {
            var _this = this;
            return new Promise(function(resolve, reject) {
                if(!_this.validateFreshdeskInfos()) {
                    reject("Please, use the init function to send the URL and API Key of Freshdesk!");
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