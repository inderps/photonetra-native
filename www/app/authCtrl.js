var AuthCtrl = can.Control.extend({
    init: function( element, options ) {
        if(options.page == "signup"){
            this.signup();
        }
        else if(options.page == "login"){
            this.login();
        }
    },

    login: function(){
        $("#titlebar").hide();
        var loginView = can.view("#login-view");
        this.element.html(loginView);

        Validate.setup("#login-form", {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        });

        Loader.stop();
    },

    signup: function(){
        $(".title").html("<span class='icon-emo-happy'></span> Sign Up");
        $("#back").hide();
        $("#menu").hide();

        var signupView = can.view("#signup-view");
        this.element.html(signupView);

        Validate.setup("#signup-form", {
            name: {
                required: true
            },
            studio_name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            website: {
                required: false
            },
            password: {
                required: true,
                minlength : 5
            },
            password: {
                required: true,
                minlength : 5
            },

            confirm_password: {
                required: true,
                minlength : 5,
                equalTo : "#password"
            }
        });

        Loader.stop();
    },

    ".submit click": function (el, ev) {
        ev.preventDefault();

        if(this.element.find("form").valid()){
            var formData = this.element.find("form").serializeJSON();
            delete formData["confirm_password"];
            Loader.start();
            Photographer.create(formData, function(data){
                Loader.stop();
                MessageModal.show("Your account is created successfully", "#!login");
            });
        }
    },

    ".login click": function (el, ev) {
        ev.preventDefault();

        if(this.element.find("form").valid()){
            var formData = this.element.find("form").serializeJSON();
            Loader.start();
            Photographer.login(formData, function(data){
                Loader.stop();
                $("body").addClass("login-cover")

                if(data.id){
                    $("#titlebar").show();
                    Authentication.create(data);
                    window.location.hash = "#!shoots/upcoming";

                }else{
                    alert("Incorrect Email/Password");
                }
            });
        }
    }
});