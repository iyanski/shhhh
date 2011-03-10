MP.data.Album = Ext.extend(Ext.data.JsonStore, {
	constructor: function(){
		var config = {
			model: 'Album',
			proxy: {
			    type: 'ajax',
			    reader: {
			        type: 'json',
			        root: 'albums'
			    }
			},
			autoLoad: false
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.data.Album.superclass.constructor.apply(this, [config]);
	}
});