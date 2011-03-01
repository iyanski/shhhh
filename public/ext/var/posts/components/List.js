Ext.namespace('Extriajs.posts.components');
Extriajs.posts.components.List = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function() {
		var me = this;
        var store = new Extriajs.data.Events();
        var config = {
            border: false,
			loadMask: true,
			autoExpandColomn: 'title',
			store: store,
			autoScroll: true,
            columns: [
				{id: 'id', header: 'ID', width: 50, sortable: false, dataIndex: 'id'},
				{id: 'title', header: 'Title', width: '50%', sortable: true, dataIndex: 'name'},
				{id: 'created_at', header: 'Created', width: 200, sortable: false, dataIndex: 'created_at'}
            ],
			tbar: [{
				text: 'Add',
				icon: icons.silk('add'),
				handler: function(){
					this.addEvent();
				},
				scope: this
			}
			,{
				text: 'Refresh',
				icon: icons.silk('refresh'),
				handler: store.reload.createDelegate(store)
			}],
			bbar: {
              xtype:'paging',
              pageSize: 2,
			  store: store,
              displayInfo: true,
              displayMsg: "Displaying events " + ' {0} - {1} of {2}',
              emptyMsg: "No Users to display"
            }
        };
        
        Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.posts.components.List.superclass.initComponent.apply(this);
		this.sm = this.getSelectionModel();

		this.on('render', function(){
            var me = this;
            if (!this.mask) {
                this.mask = new Ext.LoadMask(this.el, {
                    msg: '{0}...'.format('Loading')
                });
            }
            this.mask.show();
            this.store.load({
                params: {
                    start: 0,
                    limit: 100
                },
                callback: function () {
                    me.mask.hide();
                }
            });
			//console.log(this.ownerCt.getBottomToolbar().setStore(store));
        }, this);

		this.on('rowdblclick', function(o, i){
			//me.ownerCt.info._loadChildData(me.sm.getSelected().id);
			var tab = this.ownerCt.ownerCt.add({
				title: o.sm.getSelected().get('name'),
				xtype: 'panel',
				closable: true,
				resizeTabs: true,
				items: [{
					xtype: 'extria-posts-albums',
					idx: o.sm.getSelected().id
				}]
			});
			this.ownerCt.ownerCt.setActiveTab(tab);
		});
		
		this.on('rowcontextmenu', function(_, idx, e){
			
			var active = function(){
				return me.getStore().getAt(idx).get('is_active') == 1 ? "deactivate" : "activate"
			}
			var messageContextMenu = {
                xtype: 'menu',
                items: [{
					text: active(),
					icon: icons.silk(active() == "activate" ? "lock" : "lock_open"),
					handler: function(){
						me.toggleActivated(_.getStore().getAt(idx).id, active());
					}
				},{
					text: 'Modify',
					icon: icons.silk('calendar_edit'),
					handler: function(){
						me.editEvent(_.getStore().getAt(idx).id);
					}
				}]
            };
            
            e.stopEvent();
            var coords = e.getXY();
            Ext.create(messageContextMenu).showAt([coords[0], coords[1]]);
		});
    },

	toggleActivated: function(id, action){
		var me = this;
		Ext.Ajax.request({
			method: 'post',
			url: '/api/events/' + id + '.json',
			params: {
				status: action
			},
			success: function(msg){
				var response = Ext.util.JSON.decode(msg.responseText);
				if (response.success){
					me.getStore().reload();
				}
			}
		});
	},
	
	addEvent: function(){
		var me = this;
		me.ownerCt.form.getForm().reset();
		me.ownerCt.form.mask.hide();
	},
	
	editEvent: function(id){
		var me = this;
		me.ownerCt.form.getForm().reset();
		me.ownerCt.form.fireEvent('loadData', {
			idx: id
		})
	}
});
Ext.reg('extria-posts-list', Extriajs.posts.components.List);