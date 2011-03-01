Ext.namespace('Extriajs.base.data');

Extriajs.base.data.BaseStore = Ext.extend(Ext.data.JsonStore, {
    loaded: false,
    nameProperty: 'name',
    constructor: function() {
        
        Extriajs.base.data.BaseStore.superclass.constructor.apply(this, arguments);
        this.proxy = new Ext.data.HttpProxy({
              url: this.url,
              method: 'POST'
             });
        this.on({
            scope: this,
            load: this.onLoad
        }, this);
    },
    onLoad: function() {
        if(!this.loaded) {
            this.loaded = true;
        }
    },
    
    cacheOrLoad: function() {
        if(!this.loaded){
            this.load(arguments);
        }
        return this;
    }
});

Ext.reg('extria-store', Extriajs.base.data.BaseStore);
