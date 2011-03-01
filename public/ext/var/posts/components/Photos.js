Ext.namespace('Extriajs.posts.components');
Extriajs.posts.components.Photos = Ext.extend(Ext.DataView,{
	initComponent: function(){
		var me = this;
		
		var tpl = new Ext.XTemplate(
			'<tpl for=".">',
		        '<div class="thumb-wrap" id="{name}"><span class="">{name}</span>',
				    '<div class="thumb">',
						'<div><img src="/images/drew_logo.gif"></div>',
					'</div>',
					'<div style="width:350px; clear:both;">',
						'{colors}',
					'</div>',
					'<div style="width:350px; clear:both;"><span class="x-editable">{name}</span></div>',
				'</div>',
		    '</tpl>',
		    '<div class="x-clear"></div>'
		);
		
		var store = new Extriajs.data.Buckets();
		
		var config = {
			cls: 'data-view',
			store: store,
			tpl: tpl,
			loadMask: true,
			autoHeight:true,
			multiSelect: true,
			loadingText: 'Loading Photos...',
			overClass:'x-view-over',
			itemSelector:'div.thumb-wrap',
			emptyText: 'No Photos Found'
		};
		
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.posts.components.Photos.superclass.initComponent.apply(this);
		this.store = store;
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
				items: [{
					xtype: 'extria-posts-photos',
					idx: record.id
				}]
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
		me.store.load({
			params: {
				id: id
			},
			callback: function(){
				me.mask.hide();
			}
		});
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
			url: '/api/photos/' + _.getRecord(node).id + '.json',
			success: function(msg){
				var response = Ext.util.JSON.decode(msg.responseText);
				me.store.remove(_.getRecord(node));
				me.mask.hide();
			}
		});
	}
});
Ext.reg('extria-posts-photos', Extriajs.posts.components.Photos);