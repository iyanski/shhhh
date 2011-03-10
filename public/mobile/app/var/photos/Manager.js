Ext.namespace('MP.photos.Manager');

MP.photos.Manager = Ext.extend(Ext.Panel,{
	initComponent: function(){
		var me = this;
		var content = new MP.photos.components.List();
		
		var config = {
			ref: 'photos_manager',
			title: 'Photos',
			scroll: 'vertical',
			items:[content],
			layout: {
			    type: 'vbox',
			    align: 'stretch'
			},
			defaults: {
			    flex: 1
			},
			items: [content]
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.albums.Manager.superclass.initComponent.apply(this);
		this.controller = content;
		this.addEvents('loadPhotos');
		this.on('activate', function(){
			this.setLoading(true);
			this.controller.store.proxy.url = '/default.php/api/photos/index/' + me.item_id;
			this.controller.store.load();
			this.setLoading(false);
		});
		this.on('loadPhotos', function(data){
			var toolbar = data.root.getDockedItems();
			toolbar[0].setTitle(toolbar[0].title + "(" + data.record + " photos)");
			toolbar[1].setTitle('');
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

Ext.reg('mp-photos-manager', MP.photos.Manager);