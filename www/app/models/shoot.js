Shoot = CachedModel({
    create:  "POST " + host.get() + "photographers/{photographer_id}/shoots",
    getOne: function(attrs, callback){
        this.baseGet("shoots/" + attrs.id + "/", callback);
    },
    getAll: function(callback){
        this.baseGetAll("shoots", callback);
    },
    assign_contact:  function(attrs, callback){
        return $.ajax({
            url: host.get() + "shoots/" + attrs.shoot_id + "/assign_contact?contact_id=" + attrs.contact_id,
            type: 'post',
            dataType: 'json'
        }).done(function(data){
                callback(data);
            });
    }
},{});