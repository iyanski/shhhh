Ext.namespace('Extriajs.data');

Extriajs.data.users = Ext.extend(Extriajs.base.data.BaseStore, {

    constructor:function(){
        var config = {
            url: '/api/users/list.json'
        };
        Extriajs.data.users.superclass.constructor.apply(this, [config]);
    }
    
});