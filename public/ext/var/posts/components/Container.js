Ext.namespace('Extriajs.posts.components');

Extriajs.posts.components.Container = Ext.extend(Ext.TabPanel, {
    initComponent: function() {
        var me = this;
		//var store = new Extriajs.data.Buckets();
        var config = {
            border: false,
            activeTab: 0,
            defaults: {
                layout: 'fit'
            },
            items: [{
				title: 'Events',
				xtype: 'panel',
				items: [{
					xtype: 'tabpanel',
					activeTab: 0,
					border: false,
					items: [{
						title: 'List',
						ref: 'posts',
						layout: 'border',
						autoScroll: true,
		                items: [{
							ref: 'list',
							autoScroll: true,
							xtype: 'extria-posts-list',
							region: 'center'
						},
						{
							ref: 'form',
							region: 'east',
							width: '40%',
							border: true,
							split: true,
							xtype: 'extria-posts-updater'
						}]
		            }]
				}]
			}]
        };

        Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.posts.components.Container.superclass.initComponent.apply(this);
    }
});

Ext.reg('extria-posts-container', Extriajs.posts.components.Container);
