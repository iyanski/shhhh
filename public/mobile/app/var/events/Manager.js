Ext.namespace('MP.events.Manager');

MP.events.Manager = Ext.extend(Ext.Panel,{
	initComponent: function(){
		var me = this;
		var content = new MP.events.components.List();
		
		var config = {
			ref: 'events_manager',
			title: 'Events',
			scroll: 'vertical',
			items:[content]
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.events.Manager.superclass.initComponent.apply(this);
		this.controller = content;
		this.addEvents('loadAlbums');
		
		this.on('loadAlbums', function(data){

			data.root.getLayout().getNext().item_id = data.record.get('id');
			if(data.record.get('is_public') == 1)
				data.root.getLayout().next('slide');
			else{
				Ext.Msg.prompt('Private Event', 'Please type the password for this event:', function(text, value) {
					if(text == "ok"){
				    	Ext.Ajax.request({
							url : '/api/events/checkcode.json',
							method: 'post',
							params: {
								code: value,
								id: data.record.get('id')
							},
							success: function(response){
								var msg = Ext.util.JSON.decode(response.responseText);
								if(msg.success){
									data.root.getLayout().next('slide');
									var toolbar = data.root.getDockedItems();
									toolbar[0].previousTitle = toolbar[0].title;
									toolbar[0].setTitle(data.record.get('name'));
								}else{
									Ext.Msg.alert('Access Denied', msg.errors);
								}
							},
							failure: function(response){
								if(response.status == 404){
									Ext.Msg.alert('Error ' + response.status, "Please try again later.");
								}
							}
						});
					}
				});
			}
		});
		
		this.on('activate', function(){
			var toolbar = me.rootManager().getDockedItems();
			toolbar[0].setTitle('Drewaltizer Events');
			toolbar[0].items.getAt(0).hide();
			toolbar[1].items.getAt(0).hide();
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

Ext.reg('mp-events-manager', MP.events.Manager);