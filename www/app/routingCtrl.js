var RoutingCtrl = can.Control.extend({
    init: function( element, options ) {
    },

    "route": function(){
//        Loader.start();
//        $("#page").html("<div id='calendar-page'></div>")
//        this.options.calendarCtrl = new CalendarCtrl("#calendar-page");
        Loader.start();
        if(Authentication.isLoggedIn()){
            window.location.hash = "#!shoots/upcoming";
        }
        else{
            window.location.hash = "#!login";
        }
    },

    "login route": function(){
        Loader.start();
        if(Authentication.isLoggedIn()){
            window.location.hash = "#!shoots/upcoming";
        }
        else{
            $("body").addClass("login-cover")
            $("#page").html("<div id='login-page'></div>")
            this.options.authCtrl = new AuthCtrl("#login-page", {page: "login"});
        }
    },

    "logout route": function(){
        Loader.start();
        Photographer.logout({id: Authentication.getUser().id}, function(data){
            Authentication.clear();
            window.location.hash = "#!login";
        });
    },

    "signup route": function(){
        Loader.start();
        $("#titlebar").show();
        $("#page").html("<div id='signup-page'></div>")
        this.options.authCtrl = new AuthCtrl("#signup-page", {page: "signup"});
    },

    "shoots/upcoming route" : function() {
        Loader.start();
        $("#page").html("<div id='shoots-page'></div>")
        this.options.shootsCtrl = new ShootsCtrl("#shoots-page", {type: "all", filter: "upcoming"});
    },

    "shoots/all route" : function() {
        Loader.start();
        $("#page").html("<div id='shoots-page'></div>")
        this.options.shootsCtrl = new ShootsCtrl("#shoots-page", {type: "all", filter: "all"});
    },

    "contacts route" : function() {
        Loader.start();
        $("#page").html("<div id='contacts-page'></div>")
        this.options.contactsCtrl = new ContactsCtrl("#contacts-page", {type: "all"});
    },

    "deliveries route" : function() {
        Loader.start();
        $("#page").html("<div id='delivery-page'></div>")
        this.options.deliveryCtrl = new DeliveryCtrl("#delivery-page");
    },

    "payments route" : function() {
        Loader.start();
        $("#page").html("<div id='payments-page'></div>")
        this.options.paymentsCtrl = new PaymentsCtrl("#payments-page", {type: "all"});
    },

    "contacts/new route" : function() {
        Loader.start();
        $("#page").html("<div id='new-contact-page'></div>")
        this.options.contactsCtrl = new ContactsCtrl("#new-contact-page", {type: "new"});
    },

    "contacts/:id/show route" : function(data) {
        Loader.start();
        $("#page").html("<div id='contact-show-page'></div>");
        this.options.contactsCtrl = new ContactsCtrl("#contact-show-page", {type: "show", id: data.id});
    },

    "contacts/:id/edit route" : function(data) {
        Loader.start();
        $("#page").html("<div id='contact-edit-page'></div>");
        this.options.contactsCtrl = new ContactsCtrl("#contact-edit-page", {type: "edit", id: data.id});
    },

    "shoots/:id/choose_contact route" : function(data) {
        Loader.start();
        $("#page").html("<div id='choose-contact-page'></div>");
        this.options.contactsCtrl = new ContactsCtrl("#choose-contact-page", {type: "choose", id: data.id});
    },

    "shoots/:id/choose_contact_from_list route" : function(data) {
        Loader.start();
        $("#page").html("<div id='contacts-page'></div>")
        this.options.contactsCtrl = new ContactsCtrl("#contacts-page", {type: "all", ref: "select", id: data.id});
    },

    "shoots/:id/assign_contact/:contact_id route" : function(data) {
        Loader.start();
        $("#page").html("<div id='shoot-show-page'></div>");
        var _this =this;
        Shoot.assign_contact({shoot_id: data.id, contact_id: data.contact_id}, function(response){
            _this.options.shootsCtrl = new ShootsCtrl("#shoot-show-page", {type: "show", id: data.id});
        });
    },

    "shoots/new route" : function() {
        Loader.start();
        $("#page").html("<div id='new-shoot-page'></div>")
        this.options.shootsCtrl = new ShootsCtrl("#new-shoot-page", {type: "new"});
    },

    "shoots/:id/show  route" : function(data) {
        Loader.start();
        $("#page").html("<div id='shoot-show-page'></div>")
        this.options.shootsCtrl = new ShootsCtrl("#shoot-show-page", {type: "show", id: data.id});
    },

    "shoots/:id/edit route" : function(data) {
        Loader.start();
        $("#page").html("<div id='shoot-edit-page'></div>");
        this.options.shootsCtrl = new ShootsCtrl("#shoot-edit-page", {type: "edit", id: data.id});
    },

    "shoots/:id/pending_delivery  route" : function(data) {
        Loader.start();
        $("#page").html("<div id='shoot-show-page'></div>")
        this.options.shootsCtrl = new ShootsCtrl("#shoot-show-page", {type: "show", id: data.id});
    },

    "shoots/:id/payments/new  route" : function(data) {
        Loader.start();
        $("#page").html("<div id='payment-new-page'></div>")
        this.options.paymentsCtrl = new PaymentsCtrl("#payment-new-page", {type: "new", id: data.id});
    },

    "shoots/:id/payment  route" : function(data) {
        Loader.start();
        $("#page").html("<div id='shoot-show-page'></div>")
        this.options.shootsCtrl = new ShootsCtrl("#shoot-show-page", {type: "show", id: data.id});
    },
});