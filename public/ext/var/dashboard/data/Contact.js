Ext.namespace('Extriajs.dashboard.data');

Extriajs.dashboard.data.Contact = Ext.extend(Ext.util.Observable, {

    constructor: function(data){
        this.infos(data);
        Extriajs.dashboard.data.User.superclass.constructor.apply(this, [data]);
    },
    
    info: function(key, value){
        if(value){
            this.userData[key] = value;
        }
        return this.userData[key];
    },
    
    infos: function(data){
        this.userData = data || {};
    }
});