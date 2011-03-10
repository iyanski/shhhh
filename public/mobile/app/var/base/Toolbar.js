Ext.namespace('MP.base');
MP.base.Toolbar = Ext.extend(Ext.Toolbar, {
	initComponent: function(){
		var me = this;
		
    	var config = {
			ref: 'toolbar',
			dock : 'top',
	    	title: 'Drewaltizer Events',
	    	items: [{
				ref: 'backward',
				text: 'Previous',
				handler: function(){
					//me.ownerCt.getLayout().previous('slide');
					me.setTitle(me.previousTitle);
					me.ownerCt.getLayout().prev('');
				}
	    	}]
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.base.Toolbar.superclass.initComponent.apply(this);
	}
});