Ext.namespace('Extriajs.album');

Extriajs.album.Manager = Ext.extend(Ext.TabPanel,{
	initComponent: function(){
		var me = this;
		var config = {
        };

		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		Extriajs.album.Manager.superclass.initComponent.apply(this);
	},
	
	loadSection: function(n){
		console.log(n);
	},
	
	loadBrowser: function(){
		
	}
});
Ext.reg('extria-album-manager', Extriajs.album.Manager);