var MessageModal = (function() {
    var init = function(){
        this.href = "#";
        var _this = this;
        $("#message-modal .btn").click(function(ev){
            $("#message-modal").modal('hide');
            window.location.href = _this.href;
        });
    };

    var show = function(message, href) {
        this.href = href;
        $('#message-modal .message').html(message);
        $('#message-modal').modal('show');
    };

    return {
        show: show,
        init: init
    };

})();