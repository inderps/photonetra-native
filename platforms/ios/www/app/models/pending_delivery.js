PendingDelivery = CachedModel({
    create:  "POST " + host.get() + "shoots/{id}/mark_delivery",
    getAll: function(callback){
        this.baseGetAll("pending_deliveries", callback);
    }
},{});