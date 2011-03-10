Ext.namespace('MP.base');
MP.base.Bottombar = Ext.extend(Ext.Toolbar, {
	initComponent: function(){
		var me = this;
		
    	var config = {
			ref: 'bottombar',
			dock : 'bottom',
			title: '',
	    	items: [{
				ref: 'backward',
				text: 'Previous',
				handler: function(){
					//me.ownerCt.getLayout().previous('slide');
					me.setTitle('');
					me.ownerCt.getLayout().prev('');
					if(me.ownerCt.items.get(2).items.length > 0){
						me.ownerCt.items.get(2).items.get(0).removeAll();
					}
				}
	    	}]
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.base.Bottombar.superclass.initComponent.apply(this);
	}
});