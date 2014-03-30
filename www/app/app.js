var Photonetra = can.Construct.extend({
    init: function() {
        window.photographerId = 1;
        MessageModal.init();
        $('#menu').sidr({name: 'main-menu', source: '#menu-list', side: 'right'});
//        $('#titlebar').scrollNav({"bootstrap_mobile": true})
        new RoutingCtrl("body");
        $("#back").click(function(ev){
            ev.preventDefault();
            window.history.back();
        });
    }
});