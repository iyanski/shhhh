Ext.namespace('Extriajs.posts.components');
Extriajs.posts.components.Albums = Ext.extend(Ext.DataView,{
	initComponent: function(){
		var me = this;
		
		var tpl = new Ext.XTemplate(
			'<tpl for=".">',
		        '<div class="thumb-wrap" id="{id}">',
				    '<div class="thumb" style="background-color: {color}">',
						'<div><img src="/images/drew_logo.gif"></div>',
						'<div>{name}</div>',
					'</div>',
				'</div>',
		    '</tpl>',
		    '<div class="x-clear"></div>'
		);
		
		var config = {
			cls: 'data-view',
			tpl: tpl,
			loadMask: true,
			autoHeight:true,
			multiSelect: true,
			loadingText: 'Loading Albums...',
			overClass:'x-view-over',
			itemSelector:'div.thumb-wrap',
			emptyText: 'No Albums Found',
			singleSelect: true
		};
		
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.posts.components.Albums.superclass.initComponent.apply(this);
		this.on('contextmenu', function(_, idx, node, e){
            var me = this;
			var menu = [];
			menu.push({
				text: 'Remove',
				handler: function(){
					me._removeSelected(_, node);
				}
			});
			var messageContextMenu = {
                xtype: 'menu',
                items: menu
            };
            
            e.stopEvent();
            var coords = e.getXY();
            Ext.create(messageContextMenu).showAt([coords[0], coords[1]]);
		}, this);
		
		this.on('containercontextmenu', function(_, e){
            var me = this;
			var menu = [];
			menu.push({
				text: 'Add New Event',
				handler: function(){
					me.newEvent();
				}
			});
			var messageContextMenu = {
                xtype: 'menu',
                items: menu
            };
            
            e.stopEvent();
            var coords = e.getXY();
            Ext.create(messageContextMenu).showAt([coords[0], coords[1]]);
		}, this);
		
		this.on('render', function(_){
			this.loadData(_.idx);
			this.idx = _.idx;
        }, this);

		this.on('dblclick', function(_, index, node){
			var record = _.getRecord(node);
			var tab = this.ownerCt.ownerCt.add({
				title: record.get('name'),
				xtype: 'panel',
				closable: true,
				resizeTabs: true,
				autoScroll: true,
				items: [{
					xtype: 'extria-posts-photos',
					idx: record.id
				}],
				bbar: []
			});
			this.ownerCt.ownerCt.setActiveTab(tab);
		});
	},
	
	loadData: function(id){
		var me = this;
		if( !me.mask ){
			me.mask = new Ext.LoadMask(this.el, {
            	msg: '{0}...'.format('Loading')
        	});
		}
		var store = new Ext.data.JsonStore({
			url: '/api/events/' + id + '.json',
			autoLoad: true,
			fields: ["id", "name", "color"],
            root: 'album',
			callback: function(){
				me.mask.hide();
			},
		});
		me.store = store;
		me.idx = id;
	},
	
	_removeSelected: function(_, node){
		var me = this;
		if (!me.mask) {
            me.mask = new Ext.LoadMask(this.el, {
                msg: '{0}...'.format('Removing')
            });
        }
		Ext.Ajax.request({
			method: 'DELETE',
			url: '/api/albums/' + _.getRecord(node).id + '.json',
			success: function(msg){
				var response = Ext.util.JSON.decode(msg.responseText);
				me.store.remove(_.getRecord(node));
				me.mask.hide();
			}
		});
	}
});
Ext.reg('extria-posts-albums', Extriajs.posts.components.Albums);