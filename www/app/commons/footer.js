var Footer = (function() {

    var create = function(container, id, data) {
        var footerView = can.view(id, data);
        $("body .footer").remove();
        container.append(footerView);
    };

    return {
        create: create
    };

})();