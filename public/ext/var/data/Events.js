Ext.namespace('Extriajs.data');

Extriajs.data.Events = Ext.extend(Extriajs.base.data.BaseStore, {

    constructor:function(){
        var config = {
            //url: '/api/events/list.json'
			url: '/api/events/buckets.json'
        };
        Extriajs.data.Events.superclass.constructor.apply(this, [config]);
    }
    
});