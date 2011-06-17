Ext.namespace('Extriajs.post');

Extriajs.post.Store = Ext.extend(Ext.data.Store,{
	constructor: function(){
		var proxy = new Ext.data.HttpProxy({
			url: '/api/events',
			method: 'GET',
			prettyUrls: false,
			api: {
			    // all actions except the following will use above url
			    create  : '/api/events',
			    update  : '/api/events'
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
		Extriajs.post.Store.superclass.constructor.apply(this, [config]);
	},
});
Ext.reg('extria-post-store', Extriajs.post.Store);