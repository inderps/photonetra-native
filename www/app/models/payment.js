Payment = CachedModel({
    create:  "POST " + host.get() + "shoots/{shoot_id}/payments",
    getAll: function(callback){
        this.baseGetAll("payments", callback);
    }
},{});