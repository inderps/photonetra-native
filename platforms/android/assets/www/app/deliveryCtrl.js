var DeliveryCtrl = can.Control.extend({
    init: function( element, options ) {
        var _this = this;
        PendingDelivery.getAll(function(shoots){
            $(".title").html("<span class='icon-truck'></span> Pending Deliveries");
            $("#back").hide();
            var deliveryView = can.view("#delivery-view", {shoots: shoots});
            _this.element.html(deliveryView);
            Loader.stop();
        });
    },

    ".shoots li click": function(el, ev){
        ev.preventDefault();
        window.location.hash = el.data("href");
    }
});