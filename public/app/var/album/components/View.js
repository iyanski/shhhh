Ext.namespace('Extriajs.album');

Extriajs.album.View = Ext.extend(Ext.DataView, {
	initComponent: function(){
		var me = this;
		var store = new Extriajs.album.Store();
		var tpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="thumb-wrap" id="{name}">',
			    '<div class="thumb" style="background-color:{color}"><img src="{url}" title="{name}"></div>',
				'<span class="x-editable">{name}</span></div>',
		    '</tpl>',
		    '<div class="x-clear"></div>'
		);
		var config = {
			title: 'Albums',
			tpl: tpl,
			store: store,
			contentTab: this.initialConfig.contentTab,
			loadingText: 'Loading Albums...',
			loadMask: true,
			cls: 'albums-view',
			singleSelect: true,
			overClass:'x-view-over',
			itemSelector:'div.thumb-wrap',
			emptyText: 'No albums for this event',
			prepareData: function(data){
			    data.shortName = Ext.util.Format.ellipsis(data.name, 15);
			    data.url = base_url + data.url;
			    return data;
			},
			closable: true
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		Extriajs.album.View.superclass.initComponent.apply(this);
	}
});
Ext.reg('extria-album-view', Extriajs.album.View);

