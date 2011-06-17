Ext.namespace('Extriajs.posts.components');

Extriajs.posts.components.Updater = Ext.extend(Ext.FormPanel,{
	initComponent: function(){
		var me = this;
		var namer = Extriajs.tools.namer('post');
		var buckets = new Ext.data.Store({    
		    proxy: new Ext.data.HttpProxy({url: '/api/events/buckets'}),
		    reader: new Ext.data.JsonReader({
		    root: 'buckets',
		    fields: [
		        {name: 'name'}
		    ]
		    })
		});
		
		buckets.load();
		var config = {
			defaultType: 'textfield',
			autoScroll: true,
			frame: true,
			items: [
			new Ext.form.ComboBox({
				ref: 'folder',
				name: namer('folder'),
			    store: buckets,
				fieldLabel: 'Event Folder',
			    displayField:'name',
				editable: false,
				valueField: 'name',
			    typeAhead: true,
			    mode: 'local',
			    triggerAction: 'all',
			    selectthisnFocus:true,
			    anchor: '98%'
			}),
			{
				fieldLabel: 'Name',
				name: namer('name'),
				anchor: '98%'
			},
			{
				xtype: 'datefield',
				fieldLabel: 'Event Date',
				name: namer('event_date')
			},
			{
				xtype: 'htmleditor',
				fieldLabel: 'Description',
				name: namer('details'),
				anchor: '98%',
				height: 150,
			},
			new Ext.form.ComboBox({
				ref: 'display_type',
				store: new Ext.data.ArrayStore({
					index: 0,
				    fields: ['index','label'],
				    data: [[0,'Public'],
				           [1,'Private']]
				}),
				typeAhead: true,
				name: namer('is_public'),
				lazyRender:true,
				mode: 'local',
				hiddenName: 'is_public',
				valueField: 'index',
				displayField: 'label',
				fieldLabel: 'Display type',
				anchor: '98%',
				editable: false,
				allowBlank: false,
				triggerAction: 'all',
			    forceSelection: true,
			    emptyText:'Public?'
			}),
			new Ext.form.ComboBox({
				fieldLabel: 'Featured',
				name: namer('is_featured'),
				triggerAction: 'all',
				editable: false,
				lazyRender:true,
				mode: 'local',
				store: new Ext.data.ArrayStore({
				    fields: [
				        'index',
						'label'
				    ],
				    data: [[0,'Featured'], [1,'Not Featured']],
				}),
				hiddenName: 'featured',
				valueField: 'index',
				displayField: 'label',
				anchor: '98%',
				emptyText: 'Featured?'
			})],
			buttons: [{
				text: 'Save',
				//icon: icons.silk('disk'),
				listeners: {
					click: function(){
						me._submit();
					}
				}
			}]
		};
		
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.posts.components.Updater.superclass.initComponent.apply(this);
		this.spot = new Ext.ux.Spotlight({
            easing: 'easeOut',
            duration: .2
        });
		this.operation = !this.initialConfig.operation ? 'add' : 'update';
		this.addEvents('loadData');
		this.form = this.getForm();
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
		me.operation = "update";
		me.item_id = id;
		me.mask.show();
		Ext.Ajax.request({
			method: 'GET',
			url: '/api/events/' + id + '/edit',
			success: function(msg){
				var response = Ext.util.JSON.decode(msg.responseText);
				Ext.forEach(response.post, function (value, key) {
		            config[namer(key)] = value;
		        });
		        me.getForm().setValues(config);
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
		if(me.operation == "add"){
			var method = 'POST';
			var url = '/api/events.json';
		}else if(me.operation == "update"){
			var url = '/api/events/' + me.item_id + '.json';
			var method = 'PUT';
		}
		me.mask.show();
		me.getForm().submit({
			url: url,
			method: method,
			success: function(form, action){
				me.mask.hide();
				Extriajs.tools.Msg.alert(action.result.message);
			},
			failure: function(form, action){
				me.mask.hide();
			}
		});
	}
});

Ext.reg('extria-posts-updater', Extriajs.posts.components.Updater);