Ext.namespace('Extriajs.base.components');

Extriajs.base.components.TreeNavigation = Ext.extend(Ext.tree.TreePanel,{
	initComponent: function(){
		var me = this;
		var config = {
			animate:true, 
			autoScroll:true,
			loader: new Ext.tree.TreeLoader({
				requestMethod: 'post',
				dataUrl:'/tree'
			}),
			enableDD:false,
			containerScroll: true,
			border: false,
			root: new Ext.tree.AsyncTreeNode({
				expanded: true,
				id: 'src'
			}),
			rootVisible: false,
			listeners: {
				dblclick: function(n){
					me.loadSection(n, me);
				}
			}
        };

		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		Extriajs.base.components.TreeNavigation.superclass.initComponent.apply(this);
	},
	
	loadSection: function(n, me){
		if(n.isLeaf()){
			if(n.id == 11){
				me.loadEventBrowser();
			}
			else if(n.id == 12){
				me.loadEventUpdater();
			}
		}
	},
	
	loadEventBrowser: function(){
		app.manager().setActiveItem(1);
		var container = app.manager().activeItem;
		var tab = container.findById('event_browser');
		if(!tab) var tab = container.add({
			title: 'Browser',
			xtype: 'extria-post-list',
			id: 'event_browser',
			closable: true,
			manager: this
		});
		container.setActiveTab(tab);
		tab.getStore().load();
	},
	
	loadEventUpdater: function(id){
		app.manager().setActiveItem(1);
		var container = app.manager().activeItem;
		var tab = container.findById('event_updater');
		if(!tab) var tab = container.add({
			title: 'Create',
			xtype: 'extria-posts-updater',
			id: 'event_updater',
			closable: true,
			manager: this
		});
		container.setActiveTab(tab);
		if(id) tab.loadData(id);
	},
	
	loadAlbumBrowser: function(post_id){
		app.manager().setActiveItem(1);
		var container = app.manager().activeItem;
		var tab = container.findById('album_browser_' + post_id);

		if(!tab) var tab = container.add({
			title: 'Albums',
			xtype: 'extria-album-view',
			id: 'album_browser_' + post_id,
			post_id: post_id,
			closable: true,
			manager: this
		});

		container.setActiveTab(tab);
		//tab.getStore().load();
	}
});
Ext.reg('extria-treenav', Extriajs.base.components.TreeNavigation);