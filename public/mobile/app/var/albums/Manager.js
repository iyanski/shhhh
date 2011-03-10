Ext.namespace('MP.albums.Manager');

MP.albums.Manager = Ext.extend(Ext.Panel,{
	initComponent: function(){
		var me = this;
		var content = new MP.albums.components.List();
		
		var config = {
			ref: 'albums_manager',
			title: 'Albums',
			scroll: 'vertical',
			items:[content]
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.albums.Manager.superclass.initComponent.apply(this);
		this.controller = content;
		this.addEvents('loadPhotos');
		this.on('loadPhotos', function(data){
			data.root.getLayout().getNext().item_id = data.record.get('album_id');
			data.root.getLayout().next('slide');
			var toolbar = data.root.getDockedItems();
			toolbar[0].previousTitle = toolbar[0].title;
			toolbar[0].setTitle(data.record.get('album_name'));
			toolbar[1].setTitle('');
		});
		this.on('activate', function(){
			this.setLoading(true);
			this.controller.getStore().proxy.url = '/api/events/' + me.item_id + '.json';
			this.controller.getStore().load();
			this.setLoading(false);
			var toolbar = me.rootManager().getDockedItems();
			toolbar[1].items.getAt(0).show();
		});
	},
	rootManager: function(){
		return this.ownerCt;
	},
	reloadList: function(){
		var me = this;
		me.list.store.refresh();
	},
	delegateAction: function(action, params){
		var me = this;
		if(params == null) {
			var params = { source: me };
		}else params.source = me;
		this.rootManager().runEvent(action, params);
	}
});

Ext.reg('mp-albums-manager', MP.albums.Manager);