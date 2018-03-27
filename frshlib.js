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
            if(this.freshDeskUrl === "" || this.freshDeskUrl == undefined ||
               this.freshDeskKey === "" || this.freshDeskKey == undefined) {
                   return false;
            }
            return true;
        },

        /**
         * Create a ticket in Freshdesk
         * @method POST
         * @author Marcelo Araujo
         */
        createTicket: function(ticketData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets";
            return _this._callPromise(url, "POST", ticketData);
        },

        /**
         * View a ticket by id
         * @method GET
         * @author Marcelo Araujo
         */
        viewTicket: function(idTicket) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket;
            return _this._callPromise(url, "GET");
        },

        /**
         * View all tickets
         * @method GET
         * @author Marcelo Araujo
         */
        viewAllTickets: function() {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets";
            return _this._callPromise(url, "GET");
        },

        /**
         * Update a ticket by id
         * @method PUT
         * @author Marcelo Araujo
         */
        updateTicket: function(idTicket, ticketData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket;
            return _this._callPromise(url, "PUT", ticketData);
        },

        /**
         * Delete a ticket by id
         * @method DELETE
         * @author Marcelo Araujo
         */
        deleteTicket: function(idTicket) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket;
            return _this._callPromise(url, "DELETE");
        },

        /**
         * Create a reply in ticket
         * @method POST
         * @author Marcelo Araujo
         */
        createReply: function(idTicket, replyData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket + "/reply";
            return _this._callPromise(url, "POST", replyData);
        },

        /**
         * Create a note in ticket
         * @method POST
         * @author Marcelo Araujo
         */
        createNote: function(idTicket, noteData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/tickets/" + idTicket + "/notes";
            return _this._callPromise(url, "POST", noteData);
        },

        /**
         * Update a note by id
         * @method PUT
         * @author Marcelo Araujo
         */
        updateConversation: function(idNote, noteData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/conversations/" + idNote;
            return _this._callPromise(url, "PUT", noteData);
        },

        /**
         * Delete a conversation by id
         * @method DELETE
         * @author Marcelo Araujo
         */
        deleteConversation: function(idConversation) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/conversations/" + idConversation;
            return _this._callPromise(url, "DELETE");
        },

        /**
         * Create a contact
         * @method POST
         * @author Marcelo Araujo
         */
        createContact: function(contactData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/contacts";
            return _this._callPromise(url, "POST", contactData);
        },

        //TODO: add other functions above here and organize these functions below
        /**
         * View a contact by id
         * @author Marcelo Araujo
         */
        viewContact: function(idContact) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/contacts/" + idContact;
            return _this._callPromise(url, "GET");
        },

        /**
         * List all contacts
         * @method GET
         * @author Marcelo Araujo
         */
        listAllContacts: function() {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/contacts";
            return _this._callPromise(url, "GET");
        },

        /**
         * Filter contacts by filter.
         * @param filter: The name of filter that you'll use. (email, mobile, phone, etc...)
         * @param value: The value of filter.
         * @method GET
         * @author Marcelo Araujo
         */
        listContactsByFilter: function(filter, value) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/contacts?" + filter + "=" + value;
            return _this._callPromise(url, "GET");
        },

        /**
         * Update a contact
         * @param idContact: The contact id that you want to update
         * @param contactData: The data of contact that you want to update
         * @method PUT
         * @author Marcelo Araujo
         */
        updateContact: function (idContact, contactData) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/contacts/" + idContact;
            return _this._callPromise(url, "PUT", contactData);
        },

        /**
         * Delete a contact
         * @param idContact: The contact id that you want to delete
         * @method DELETE
         * @author Marcelo Araujo
         */
        deleteContact: function(idContact) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/contacts/" + idContact;
            return _this._callPromise(url, "DELETE");
        },

        /**
         * Make agent
         * @param idContact
         * @method PUT
         * @author Marcelo Araujo
         */
        makeAgent: function(idContact) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/contacts/" + idContact + "/make_agent";
            return _this._callPromise(url, "PUT");
        },

        /**
         * View a company by id
         * @author Marcelo Araujo
         */
        viewCompany: function(idCompany) {
            var _this = this;
            var url = _this.freshDeskUrl + "/api/v2/companies/" + idCompany;
            return _this._callPromise(url, "GET");
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