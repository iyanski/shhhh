Ext.namespace('Extriajs.post');

Extriajs.post.Manager = Ext.extend(Ext.TabPanel,{
	initComponent: function(){
		var me = this;
		var config = {
        };

		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		Extriajs.post.Manager.superclass.initComponent.apply(this);
	},
	
	loadSection: function(n){
		console.log(n);
	},
	
	loadBrowser: function(){
		
	}
});
Ext.reg('extria-post-manager', Extriajs.post.Manager);