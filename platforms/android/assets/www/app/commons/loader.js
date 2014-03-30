var Loader = (function() {

    var start = function() {
        $.sidr('close', 'main-menu');
        if($("body").hasClass("login-cover")){
            $("body").removeClass("login-cover");
        }

        var waitLoaderDOM = '<div id="wait-loader-backdrop"><div class="spinner-new"></div></div>';
        this.stop();
        $('body').append(waitLoaderDOM);
        $('body').addClass('no-pointer-events');
    };

    var stop = function() {
        $('body').removeClass('no-pointer-events');
        $('#wait-loader-backdrop').remove();
    };

    return {
        start: start,
        stop: stop
    };

})();