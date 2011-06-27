Ext.namespace('Extriajs.album');

Extriajs.album.Store = Ext.extend(Ext.data.Store,{
	constructor: function(){
		var proxy = new Ext.data.HttpProxy({
			url: '/api/albums',
			method: 'GET',
			prettyUrls: false,
			api: {
			    // all actions except the following will use above url
			    create  : '/api/albums',
			    update  : '/api/albums'
			}
		});

		var reader = new Ext.data.JsonReader({
			totalProperty: "totalResults",
			root: "rows"
			},[
					{name: 'id', mapping: 'id'},
					{name: 'title', mapping: 'title'},
					{name: 'event_date', mapping: 'date_created'}, 
					{name: 'created_at', mapping: 'created_at'}, 
					{name: 'is_public', mapping: 'is_public'}
		]);

		var config = {
			proxy: proxy,
			reader: reader
		};
		Extriajs.album.Store.superclass.constructor.apply(this, [config]);
	},
});
Ext.reg('extria-album-store', Extriajs.album.Store);