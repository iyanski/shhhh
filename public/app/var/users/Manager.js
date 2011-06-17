Ext.namespace('Extriajs.users');

Extriajs.users.Manager = Ext.extend(Ext.TabPanel,{
	initComponent: function(){
		var me = this;
		var config = {
			activeTab: 0,
			items:[{
				title: 'Users'
			}]
        };

		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		Extriajs.users.Manager.superclass.initComponent.apply(this);
	},
	
	loadSection: function(n){
		console.log(n);
	},
	
	loadBrowser: function(){
		
	}
});
Ext.reg('extria-users-manager', Extriajs.users.Manager);