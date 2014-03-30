var host = {
    get: function(){
        var server;
        if(window.location.host.indexOf("localhost") == -1){
            server = "http://photonetra-api.herokuapp.com/";
        }
        else{
            server = "http://photonetra-api.herokuapp.com/";
        }
        return server;
    }
}