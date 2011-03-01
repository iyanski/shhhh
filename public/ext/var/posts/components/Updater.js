Ext.namespace('Extriajs.posts.components');

Extriajs.posts.components.Updater = Ext.extend(Ext.FormPanel,{
	initComponent: function(){
		var me = this;
		var namer = Extriajs.tools.namer('post');
		/*
		var category_store = new Ext.data.Store({    
		    proxy: new Ext.data.HttpProxy({url: '/api/categories/list.json'}),
		    reader: new Ext.data.JsonReader({
		    root: 'categories',
		    fields: [
		        {name: 'id'},
		        {name: 'name'}
		    ]
		    })
		});
		
		category_store.load();
		*/
		var config = {
			defaultType: 'textfield',
			autoScroll: true,
			frame: true,
			items: [{
				fieldLabel: 'Name',
				name: namer('name'),
				anchor: '98%'
			},
			{
				fieldLabel: 'Event Folder',
				name: namer('folder'),
				anchor: '98%'
			},
			{
				fieldLabel: 'Event Date',
				name: namer('event_date'),
				anchor: '98%'
			},
			{
				fieldLabel: 'Photographer',
				name: namer('photographer_id'),
				anchor: '98%'
			},
			{
				xtype: 'htmleditor',
				fieldLabel: 'Description',
				name: namer('details'),
				anchor: '98%',
				height: 150,
			},
			{
				fieldLabel: 'Display Type',
				name: namer('is_public'),
				anchor: '98%'
			},
			{
				fieldLabel: 'Featured',
				name: namer('is_featured'),
				anchor: '98%'
			},
			{
				fieldLabel: 'Blog URL',
				name: namer('event_date'),
				anchor: '98%'
			}],
			buttons: [{
				text: 'Save',
				icon: icons.silk('disk'),
				listeners: {
					click: function(){
						me._submit();
					}
				}
			},{
				text: 'Cancel',
				icon: icons.silk('cancel'),
				listeners: {
					click: function(){
						me.ownerCt.ownerCt.getLayout().setActiveItem(0);
					}
				}
			}]
		};
		
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.posts.components.Updater.superclass.initComponent.apply(this);
		this.addEvents('loadData');
		this.on('loadData', function(data){
			me.loadData(data.idx);
		});
	},
	
	loadData: function(id){
		var me = this;
		var config = {};
		var namer = Extriajs.tools.namer('post');
		if( !me.mask ){
			me.mask = new Ext.LoadMask(this.el, {
            	msg: '{0}...'.format('Loading')
        	});
		}
		me.mask.show();
		Ext.Ajax.request({
			method: 'GET',
			url: '/api/events/' + id + '.json',
			success: function(msg){
				var response = Ext.util.JSON.decode(msg.responseText);
				Ext.forEach(response.post, function (value, key) {
		            config[namer(key)] = value;
		        });
		        me.getForm().setValues(config);
				//me.tag.setValue(response.product.tag);
				me.mask.hide();
			},
			failure: function(msg){
				me.mask.hide();
			}
		});
	},
	
	_submit: function(){
		var me = this;
		if( !me.mask ){
			me.mask = new Ext.LoadMask(this.el, {
            	msg: '{0}...'.format('Loading')
        	});
		}
		if(me.ownerCt.operation == "add"){
			var method = 'POST';
			var url = '/api/events/create.json';
		}else if(me.ownerCt.operation == "update"){
			var url = '/api/events/' + me.ownerCt.app_id + '.json';
			var method = 'PUT';
		}
		me.mask.show();
		me.getForm().submit({
			url: url,
			method: method,
			success: function(form, action){
				Ext.Msg.alert("Success", action.result.message);
				me.ownerCt.ownerCt.list.store.reload();
				me.mask.hide();
			},
			failure: function(form, action){
				me.mask.hide();
			}
		});
	}
});

Ext.reg('extria-posts-updater', Extriajs.posts.components.Updater);