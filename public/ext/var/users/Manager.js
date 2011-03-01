Ext.namespace('Extriajs.users.Manager');

Extriajs.users.Manager = Ext.extend(Extriajs.base.AbstractController, {
	name: 'users',
	mainId: 'users_id',
	
	constructor: function(){
	    Extriajs.users.Manager.superclass.constructor.apply(this, arguments);
	},

	home: function(){
	    this.replace({
	        id: this.mainId,
	        xtype: 'extria-users-container'
	    });
	}

});

Ext.reg('extria-users-manager', Extriajs.users.Manager);