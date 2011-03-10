Ext.namespace('MP.albums.components');
MP.albums.components.List = Ext.extend(Ext.List,{
	initComponent: function(){
		var me = this;
		var store = new MP.data.Album();
		var config = {
			itemTpl: '<strong>{album_name}</strong>',
		    selModel: {
		        mode: 'SINGLE',
		        allowDeselect: false
		    },
		    grouped: false,
		    indexBar: true,

		    onItemDisclosure: {
		        scope: 'test',
		        handler: function(record, btn, index) {
		            alert('Disclose more info for ' + record.get('name'));
		        }
		    },
			scroll: false,
		    store: store,
			listeners: {
				itemtap: function(_, idx, el, e){
					me.ownerCt.delegateAction('loadPhotos', { 
						record: _.getRecord(el)
					});
				}
			}
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.albums.components.List.superclass.initComponent.apply(this);
		this.store = store;
	}
});
Ext.reg('mp-albums-list', MP.albums.components.List);