Ext.namespace('Extriajs.post');

Extriajs.post.List = Ext.extend(Ext.grid.GridPanel,{
	initComponent: function(){
		var me = this;
		
		var store = new Extriajs.post.Store();
		
		var config = {
			border: false,
			loadMask: true,
			autoExpandColomn: 'title',
			store: store,
			autoScroll: true,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
            columns: [
				{id: 'id', header: 'ID', width: 50, sortable: false, dataIndex: 'id'},
				{id: 'title', header: 'Title', sortable: true, dataIndex: 'name'},
				{id: 'event_date', header: 'Event Date', width: 200, sortable: false, dataIndex: 'event_date'},
				{id: 'is_public', header: 'Public', width: 200, sortable: false, dataIndex: 'is_public'},
				{id: 'created_at', header: 'Created', width: 200, sortable: false, dataIndex: 'created_at'}
            ],
			tbar: [{
				text: 'Add',
				handler: function(){
					this.addEvent();
				},
				scope: this
			}
			,{
				text: 'Refresh',
				handler: store.reload.createDelegate(store)
			}],
			tbar: new Ext.Toolbar({
				items: [{
					text: 'Manage',
					menu: [{
						text: 'Modify',
						listeners: {
							click: function(){
								me.manager.loadEventUpdater(me.getSelectionModel().getSelected().id);
							}
						}
					},{
						text: 'Delete',
						listeners: {
							click: function(){
								me._deleteEvent(me.getSelectionModel().getSelected().id);
							}
						}
					},{
						text: 'Synchronize',
						listeners: {
							click: function(){
								me._synchEvent();
							}
						}
					},{
						text: 'Watermark',
						listeners: {
							click: function(){
								me._watermarkEvent();
							}
						}
					},{
						id: 'download_caption_sheet',
						text: 'Download Caption Sheet',
						listeners: {
							click: function(){
								me._downloadCaptionSheet();
							}
						}
					}]
				},{
						text: 'View Details',
						listeners: {
							click: function(){
								me._viewDetails();
							}
						}
				},{
					text: 'Refresh',
					listeners: {
						click: function(){
							me.getStore().reload();
						}
					}
				},'->',	
				new Ext.form.ComboBox({
					ref: 'search_type',
					store: new Ext.data.ArrayStore({
						index: 0,
					    fields: ['index','label'],
					    data: [['events','Events'],
					           ['photos','Photos'],
							   ['allphotos','All Photos']]
					}),
					typeAhead: false,
					name: 'search_type',
					mode: 'local',
					displayField: 'label',
					editable: false,
					triggerAction: 'all',
					forceSelection: true,
					emptyText:'Search What?'
				}),{
					ref: 'keyword',
					xtype: 'textfield'
				},{
					text: 'Search',
					listeners: {
						click: function(c){
							var search_what = c.ownerCt.search_type.getValue();
							if(search_what == ''){
								Ext.Msg.alert('Ooops', 'Please specify what to search for from the combo list.');
								return;
							}
							me._search(search_what, c);
						}
					}
				}]
			}),
			bbar: {
              xtype:'paging',
              pageSize: 2,
			  store: store,
              displayInfo: true,
              displayMsg: "Displaying events " + ' {0} - {1} of {2}',
              emptyMsg: "No Events to display"
            }
        };

		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		Extriajs.post.List.superclass.initComponent.apply(this);
		this.manager = this.initialConfig.manager;
	},
	
	_deleteEvent: function(id){
		var me = this;
		Extriajs.tools.ajax.normalizedJson({
            url: '/api/events/' + id,
            method: 'delete',
            scope: this,
            success: function (json) {
				me.getStore().reload();
                Extriajs.tools.Msg.alert(json.message);
            },
            failure: function (json) {
                Extriajs.tools.Msg.alert(json.message);
            }
        }, this);
	}
});
Ext.reg('extria-post-list', Extriajs.post.List);