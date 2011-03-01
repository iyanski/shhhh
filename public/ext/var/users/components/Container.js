Ext.namespace('Extriajs.users.components');

Extriajs.users.components.Container = Ext.extend(Ext.TabPanel, {
    initComponent: function() {
        var me = this;
        var config = {
            border: false,
            activeTab: 0,
            defaults: {
                layout: 'fit'
            },
            items: [{
				title: 'Users',
				ref: 'users',
				layout: 'card',
				activeItem: 0,
                items: [{
					ref: 'list',
					xtype: 'extria-users-list',
					split: true,
					border: true
				},
				{
					ref: 'info',
					xtype: 'extria-users-info',
					split: true
				}]
            }]
        };

        Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.users.components.Container.superclass.initComponent.apply(this);
    }
});

Ext.reg('extria-users-container', Extriajs.users.components.Container);
