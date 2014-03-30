var Authentication = {
    getUser: function(){
        var user = store.get("photonetra_user");
        if(user){
            return user;
        }else{
            window.location.hash = "#!login"
            return false;
        }
    },

    create: function(data){
        store.set("photonetra_user", {
            id: data.id,
            token: data.token
        });
    },

    clear: function(){
        store.remove('photonetra_user');
    }
}