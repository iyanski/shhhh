Ext.namespace('Extriajs.users.components');
Extriajs.users.components.List = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function() {
		var me = this;
        var store = new Extriajs.data.users();
        var config = {
            border: false,
			loadMask: true,
			autoExpandColomn: 'title',
			store: store,
            columns: [
				{id: 'id', header: 'ID', width: 50, sortable: false, dataIndex: 'id'},
				{id: 'email', header: 'Email', width: '50%', sortable: true, dataIndex: 'email'},
				{id: 'is_active', header: 'Active', width: 200, sortable: false, dataIndex: 'is_active'}
            ],
			tbar: [{
				text: 'Add',
				icon: icons.silk('add'),
				handler: function(){
					this.addUser();
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
              store: store,
              pageSize: 100,
              displayInfo: true,
              displayMsg: "Displaying users " + ' {0} - {1} of {2}',
              emptyMsg: "No Users to display"
            }
        };
        
        Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.users.components.List.superclass.initComponent.apply(this);
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
        }, this);

		this.on('rowclick', function(o, i){
			me.ownerCt.info.operation = "update";
			me.ownerCt.info.app_id = me.sm.getSelected().id;
			me.ownerCt.info._loadChildData(me.sm.getSelected().id);
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
			url: '/api/users/' + action + '.json',
			params: {
				id: id
			},
			success: function(msg){
				var response = Ext.util.JSON.decode(msg.responseText);
				if (response.success){
					me.getStore().reload();
				}
			}
		});
	},

	addUser: function(){
		var me = this;
		me.ownerCt.getLayout().setActiveItem(1);
		me.ownerCt.info.operation = "add";
		me.ownerCt.info.updater.getForm().reset();
	}
});
Ext.reg('extria-users-list', Extriajs.users.components.List);