MP.data.Photo = Ext.extend(Ext.data.Store, {
	constructor: function(){
		var config = {
			model: 'Photo',
			proxy: {
			    type: 'ajax',
			    reader: {
			        type: 'json',
			        root: 'photos'
			    }
			},
			autoLoad: false,
		    getGroupString : function(record) {
		        return record.get('date_created')[0];
		    }
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.data.Photo.superclass.constructor.apply(this, [config]);
	}
});