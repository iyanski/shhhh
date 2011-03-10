Ext.namespace('MP.base.Manager');

MP.base.Manager = Ext.extend(Ext.Panel,{
	initComponent: function(){
		var me = this;
		var slide_next = new Ext.Anim.run(this, 'slide', {
		    reverse: 'left'
		});
		var slide_prev = new Ext.Anim.run(this, 'slide', {
		    direction: 'right'
		});
		var config = {
			ref: 'root',
			fullscreen: true,
			layout: 'card',
			dockedItems: [
				new MP.base.Toolbar(),
				new MP.base.Bottombar()
			],
			items:[{
				ref: 'posts',
				xtype: 'mp-events-manager',
			},{
				ref: 'albums',
				xtype: 'mp-albums-manager',
			},{
				ref: 'photos',
				xtype: 'mp-photos-manager',
			}]
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.base.Manager.superclass.initComponent.apply(this);
		this.slide_next = slide_next;
		this.slide_prev = slide_prev;
	},
	runEvent: function(event, params){
		var me = this;
		params.root = me;
		params.source.fireEvent(event, params);
	}
});

Ext.reg('mp-base-manager', MP.base.Manager);