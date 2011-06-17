Ext.namespace('Extriajs.base.components');

Extriajs.base.components.ViewPort = Ext.extend(Ext.Viewport,{
	initComponent: function(){
		
		var config = {
			ref: 'airport',
			layout: 'border',
			items: [{
				ref: 'sidepanel',
				title: 'Media panel',
				region: 'west',
				xtype: 'extria-sidepanel',
				split: true
			},{
				ref: 'content',
				region: 'center',
                xtype: 'panel',
				split: true,
				layout: 'card',
				activeItem: 0,
				items: [{
					xtype: 'panel',
					html: 'drewaltizer'
				},{
					xtype: 'extria-post-manager',
				},{
					xtype: 'extria-users-manager',
				}],
				bbar: {
	                xtype: 'extria-statusbar'
	            }
			}]
        };

		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		Extriajs.base.components.ViewPort.superclass.initComponent.apply(this);
	},
	
	statusBar: function() {
    	return this.contentArea().getBottomToolbar();
	},
});