Ext.namespace('Extriajs.posts.components');
Extriajs.posts.components.Info = Ext.extend(Ext.Panel,{
	initComponent: function(){
		var me = this;
		var config = {
			layout: 'card',
			activeItem: 0,
			items: [{
				ref: 'updater',
				xtype: 'extria-posts-updater'
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
        Extriajs.posts.components.Info.superclass.initComponent.apply(this);
	},
	_loadChildData: function(){
		this.ownerCt.getLayout().setActiveItem(1);
		if(this.app_id){
			this.getLayout().activeItem.loadData(this.app_id);
		}
	}
});
Ext.reg('extria-posts-info', Extriajs.posts.components.Info);