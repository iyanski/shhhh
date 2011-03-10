Ext.namespace('Extriajs.data');

Extriajs.data.Albums = Ext.extend(Extriajs.base.data.BaseStore, {

    constructor:function(){
        var config = {
            url: '/api/albums/list.json'
			//url: '/api/events/buckets.json'
        };
        Extriajs.data.Albums.superclass.constructor.apply(this, [config]);
    } 
});