Contact = CachedModel({
    create:  "POST " + host.get() + "photographers/{photographer_id}/contacts",
    getOne: function(attrs, callback){
        this.baseGet("contacts/" + attrs.id + "/", callback);
    },
    getAll: function(callback){
        this.baseGetAll("contacts", callback);
    },
    updateMe:  function(contact, callback){
        return $.ajax({
            url: host.get() + "contacts/" + contact.id,
            type: 'post',
            data: contact,
            dataType: 'json'
        }).done(function(data){
                callback(data);
        });
    }
},{});