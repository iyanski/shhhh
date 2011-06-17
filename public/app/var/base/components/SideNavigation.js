Ext.namespace('Extriajs.base.components');

Extriajs.base.components.SideNavigation = Ext.extend(Ext.Panel, {
	initComponent: function(){
		var config = {
		    title: 'Accordion Layout',
		    layout:'accordion',
			collapsible: true,
		    defaults: {
		        bodyStyle: 'padding:15px'
		    },
		    layoutConfig: {
		        animate: true,
		    },
			width: 320,
			minSize: 175, maxSize: 400,
		    items: [{
		        title: 'Media Browser',
		        xtype: 'extria-treenav',
				padding: 0
		    },
			{
		        title: 'Captions',
		        html: '<p>Panel content!</p>'
		    },
			{
		        title: 'Property Editor',
		        html: '<p>Panel content!</p>'
		    },
			{
		        title: 'Media Users Selector',
		        html: '<p>Panel content!</p>'
		    }]
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		Extriajs.base.components.SideNavigation.superclass.initComponent.apply(this);
	}
});
Ext.reg('extria-sidepanel', Extriajs.base.components.SideNavigation);