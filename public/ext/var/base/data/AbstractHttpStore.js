Ext.namespace('Extriajs.base.data');

Extriajs.base.data.BaseHttpStore = Ext.extend(Ext.data.JsonStore, {
    loaded: false,
    nameProperty: 'name',
    constructor: function() {
        
        Extriajs.base.data.BaseHttpStore.superclass.constructor.apply(this, arguments);
        this.proxy = new Ext.data.ScriptTagProxy({
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

Ext.reg('extria-httpstore', Extriajs.base.data.BaseHttpStore);
