Ext.namespace('Extriajs.base');
Extriajs.base.Manager = Ext.extend(Ext.util.Observable,{
	name: 'base',
	constructor: function(controller){
		Extriajs.base.Manager.superclass.constructor.apply(this);
	},
	
	bootstrap: function(){
       Ext.QuickTips.init();
       this.loadLayout();
       return this;
   	},

	loadLayout: function(){
       this.mask = Extriajs.bodyMask;
       this.layout = new Extriajs.base.components.ViewPort();
   	},

	manager: function(){
		return this.layout.items.get(1).getLayout();
	}
});