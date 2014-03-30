CachedModel= can.Model.extend({
    baseGet: function(url, callback){
        var user = Authentication.getUser();
        if(user){
            return $.ajax({
                url: host.get() + url,
                type: 'get',
                dataType: 'json'
            }).done(function(data){
                    callback(data);
            });
        }
    },

    baseGetAll: function(resource, callback){
        var user = Authentication.getUser();
        if(user){
            return $.ajax({
                url: host.get() + "photographers/" + user.id + "/" + resource,
                type: 'get',
                dataType: 'json'
            }).done(function(data){
                    callback(data);
                });
        }
    },

    getLocal: function(url){
        return store.get(window.specialistHref + url);
    },

    getRemote: function(url, callback){
        return $.ajax({
            url: url,
            type: 'get',
            dataType: 'json'
        }).done(function(data){
                callback(data);
            });
    },

    updateLocal: function(url, attrs){
        store.set(window.specialistHref + url, {
            data: attrs,
            created_at: new Date()
        });
    },

    removeLocal: function(url){
        store.remove(window.specialistHref + url);
    },

    purge: function(){
        store.clear();
    }
}, {});