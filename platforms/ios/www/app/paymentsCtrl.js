var PaymentsCtrl = can.Control.extend({
    init: function( element, options ) {
        if(options.type == "new"){
            this.new(options.id);
        }
        else if(options.type == "all"){
            this.all();
        }
    },

    all: function(){
        var _this = this;
        $(".title").html("<span class='icon-money'></span> Pending Payments");
        $("#back").hide();


        Payment.getAll(function(shoots){

            var payments = can.view("#payments-view", {shoots: shoots});
            _this.element.html(payments);
            Loader.stop();
        });
    },

    new: function(shoot_id){
        $(".title").html("<span class='icon-dollar'></span> New Transaction");
        $("#back").show();
        var _this=this;

        Shoot.getOne({id: shoot_id}, function(shoot){
            _this.payment = new can.Map({
                shoot_id: shoot_id,
                payment_date: "",
                amount: "",
                comment: ""
            });

            var paymentForm = can.view("#payment-form-view", {shoot: shoot, payment: _this.payment});
            _this.element.html(paymentForm);

            DateTimePicker.dateInit("#payment-date");
            $("#payment-date").pickadate('picker').set('select', new Date());

            Validate.setup("#new-payment-form", {
                payment_date: {
                    required: true
                },
                amount: {
                    required: true,
                    number: true
                }
            });
            Loader.stop();
        });
    },

    "#payment-submit click": function(el, ev){
        ev.preventDefault();

        if(this.element.find("form").valid()){
            Loader.start();
            Payment.create(this.payment.attr(), function(response){
                Loader.stop();
                MessageModal.show("New transaction added successfully", "#shoots/" + response.shoot_id + "/show");
            });
        }
    },

    ".shoots li click": function(el, ev){
        ev.preventDefault();
        window.location.hash = el.data("href");
    }
});