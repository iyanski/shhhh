Ext.namespace('Extriajs.users.components');
Extriajs.users.components.Info = Ext.extend(Ext.Panel,{
	initComponent: function(){
		var me = this;
		var config = {
			layout: 'card',
			activeItem: 0,
			items: [{
				ref: 'updater',
				xtype: 'extria-users-updater'
			}],
			tbar: [{
				text: 'Cancel',
				icon: icons.silk('cancel'),
				listeners: {
					click: function(){
						me.ownerCt.getLayout().setActiveItem(0);
					}
				}
			}]
		};
		
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.users.components.Info.superclass.initComponent.apply(this);
		me.operation = 'add';
	},
	_loadChildData: function(){
		this.ownerCt.getLayout().setActiveItem(1);
		if(this.app_id){
			this.getLayout().activeItem.loadData(this.app_id);
		}
	}
});
Ext.reg('extria-users-info', Extriajs.users.components.Info);