Ext.namespace('Extriajs.data');

Extriajs.data.Buckets = Ext.extend(Extriajs.base.data.BaseStore, {

    constructor:function(){
        var config = {
            url: '/api/events/buckets.json',
			fields: ["id",
	            "name"],
            root: 'buckets'
        };
        Extriajs.data.Buckets.superclass.constructor.apply(this, [config]);
    }
    
});