Ext.namespace('Extriajs.posts.Manager');

Extriajs.posts.Manager = Ext.extend(Extriajs.base.AbstractController, {
	name: 'posts',
	mainId: 'posts_id',
	
	constructor: function(){
	    Extriajs.posts.Manager.superclass.constructor.apply(this, arguments);
	},

	home: function(){
	    this.replace({
	        id: this.mainId,
	        xtype: 'extria-posts-container'
	    });
	}

});

Ext.reg('extria-posts-manager', Extriajs.posts.Manager);