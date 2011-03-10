Ext.namespace('MP.events.components');

MP.events.components.List = Ext.extend(Ext.List,{
	initComponent: function(){
		var me = this;
		var store = new MP.data.Event();
		var config = {
			itemTpl: '<strong>{name}</strong>',
		    selModel: {
		        mode: 'SINGLE',
		        allowDeselect: false
		    },
		    grouped: false,
		    indexBar: true,

		    onItemDisclosure: {
		        scope: 'test'
		    },
		    store: store,
			scroll: false,
			listeners: {
				itemtap: function(_, idx, el, e){
					me.ownerCt.delegateAction('loadAlbums', { 
						record: _.getRecord(el)
					});
				}
			}
		};
		
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.events.components.List.superclass.initComponent.apply(this);
		this.store = store;
	},
	
	
});

Ext.reg('mp-events-list', MP.events.components.List);