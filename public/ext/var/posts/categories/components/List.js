Ext.namespace('Extriajs.categories.components');
Extriajs.categories.components.List = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function() {
		var me = this;
        var store = new Extriajs.data.categories();
        var config = {
            border: false,
			loadMask: true,
			autoExpandColomn: 'title',
			store: store,
            columns: [
				{id: 'id', header: 'ID', width: '10%', sortable: false, dataIndex: 'id'},
				{id: 'name', header: 'Name', width: '90%', sortable: false, dataIndex: 'name'}
            ],
			tbar: [{
				text: 'Add',
				icon: icons.silk('add'),
				handler: function(){
					me.addCategory();
				}
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
              displayMsg: "Displaying categories " + ' {0} - {1} of {2}',
              emptyMsg: "No Users to display"
            }
        };
        
        Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.categories.components.List.superclass.initComponent.apply(this);
		this.sm = this.getSelectionModel();
		this.store = store;
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
		
		this.on('rowcontextmenu', function(_, idx, e){
			var messageContextMenu = {
                xtype: 'menu',
                items: [{
					text: "Delete",
					icon: icons.silk("delete"),
					handler: function(){
						me.deleteCategory(_.getStore().getAt(idx).id);
					}
				}]
            };
            
            e.stopEvent();
            var coords = e.getXY();
            Ext.create(messageContextMenu).showAt([coords[0], coords[1]]);
		});
    },

	deleteCategory: function(id){
		var me = this;
		Ext.Ajax.request({
			method: 'DELETE',
			url: '/api/categories/' + id + '.json',
			params: {
				id: id
			},
			scope: this,
			success: function(msg){
				var response = Ext.util.JSON.decode(msg.responseText);
				if (response.success){
					this.getStore().reload();
				}
			}
		});
	},

	addCategory: function(){
		var me = this;
		var window = new Extriajs.categories.components.Create();
		window.show();
		window.on('success', function(){
			window.close();
			me.store.reload();
		});
	}
});
Ext.reg('extria-categories-list', Extriajs.categories.components.List);
