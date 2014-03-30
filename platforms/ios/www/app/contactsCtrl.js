var ContactsCtrl = can.Control.extend({
    init: function( element, options ) {
        if(options.type == "new"){
            this.new();
        }
        else if(options.type == "choose"){
            this.choose(options.id);
        }
        else if(options.type == "all"){
            this.all(options.ref, options.id);
        }
        else if(options.type == "show"){
            this.show(options.id);
        }
        else if(options.type == "edit"){
            this.edit(options.id);
        }
    },

    show: function(id){
        var _this = this;
        Contact.getOne({id: id}, function(contact){
            $(".title").html("<span class='icon-user'></span> " + contact.name);
            $("#back").show();

            var contactView = can.view("#contact-view", contact);
            _this.element.html(contactView);
            Footer.create(_this.element, "#contact-footer", contact);
            Loader.stop();
        });
    },

    all: function(ref, shoot_id){
        var _this = this;
        $(".title").html("<span class='icon-user'></span> Contacts");
        $("#back").hide();

        if(ref){
            $("#back").show();
        }

        Contact.getAll(function(contacts){

            var contactsView = can.view("#contacts-view", {contacts: contacts, shoot_id: shoot_id});
            _this.element.html(contactsView);

            Footer.create(_this.element, "#contacts-footer", null);
            Loader.stop();
        });
    },

    new: function(){
        $(".title").html("<span class='icon-user'></span> Create New Contact");
        $("#back").show();

        this.contact = new can.Map({
            photographer_id: Authentication.getUser().id,
            name: "",
            email: "",
            phone: ""
        });

        var contactForm = can.view("#contact-form-view", this.contact);
        this.element.html(contactForm);
        this.element.find("form").append("<button id='create-contact' class='btn btn-success btn-lg submit'><span class='icon-plus'></span> Create</button>")


        Validate.setup("#new-contact-form", {
            name: {
                required: true
            },
            phone: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        });

        Loader.stop();
    },

    edit: function(id){
        var _this = this;
        Contact.getOne({id: id}, function(contact){
            $(".title").html("<span class='icon-user'></span> " + contact.name);
            $("#back").show();

            _this.contact = new can.Map({
                photographer_id: Authentication.getUser().id,
                id: contact.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone
            });

            var contactForm = can.view("#contact-form-view", _this.contact);
            _this.element.html(contactForm);
            _this.element.find("form").append("<button id='update-contact' class='btn btn-success btn-lg submit'>Update</button>")
            Loader.stop();
        });
    },

    choose: function(shoot_id){
        $(".title").html("<span class='icon-user'></span> Choose Contact");
        $("#back").show();

        var selectContactView = can.view("#select-contact-view", {shoot_id: shoot_id});
        this.element.html(selectContactView);

        this.contact = new can.Map({
            shoot_id: shoot_id,
            photographer_id: Authentication.getUser().id,
            name: "",
            email: "",
            phone: ""
        });

        var contactForm = can.view("#contact-form-view", this.contact);
        this.element.find(".form-area").html(contactForm);

        Validate.setup("#new-contact-form", {
            name: {
                required: true
            },
            phone: {
                required: true
            },
            email: {
                required: true,
                email: true
            }
        });

        Loader.stop();
    },

    "#create-contact click": function(el, ev){
        ev.preventDefault();

        if(this.element.find("form").valid()){
            Loader.start();
            Contact.create(this.contact.attr(), function(response){
                Loader.stop();
                MessageModal.show("New contact created successfully", "#contacts/" + response.id + "/show");
            });
        }
    },

    "#update-contact click": function(el, ev){
        ev.preventDefault();

        Loader.start();
        Contact.updateMe(this.contact.attr(), function(response){
            Loader.stop();
            MessageModal.show("Contact updated successfully", "#contacts/" + response.id + "/show");
        });
    },

    "#create-contact-to-shoot click": function(el, ev){
        ev.preventDefault();
        var _this = this;

        if(this.element.find("form").valid()){
            Loader.start();
            Contact.create(this.contact.attr(), function(response){
                Loader.stop();
                window.location.hash = "#shoots/" + _this.contact.attr().shoot_id + "/assign_contact/" + response.id;
            });
        }
    },

    "#choose-existing click": function(el, ev){
        ev.preventDefault();
        window.location.hash = el.data("href");
    },

    ".contacts li click": function(el, ev){
        ev.preventDefault();
        window.location.hash = el.data("href");
    }
});