MP.data.Event = Ext.extend(Ext.data.Store, {
	constructor: function(){
		var config = {
			model: 'Event',
			proxy: {
			    type: 'ajax',
			    url : '/api/events.json',
			    reader: {
			        type: 'json',
			        root: 'posts'
			    }
			},
			autoLoad: true,
		    getGroupString : function(record) {
		        return record.get('date_created')[0];
		    }
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.data.Event.superclass.constructor.apply(this, [config]);
	}
});