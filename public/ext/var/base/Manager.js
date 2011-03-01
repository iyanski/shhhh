Ext.namespace('Extriajs.base');
Extriajs.base.Manager = Ext.extend(Extriajs.base.AbstractController, {
   name: 'base',
   children: [
        'dashboard',
        'posts',
		'bookings',
		'users',
		'distribution',
		'reports',
		'promotions',
		'salesorders',
		'salesdetails',
		'options'
    ],
    
   constructor: function(controller){
       Extriajs.base.Manager.superclass.constructor.apply(this);
   },
   
   bootstrap: function(){
       Ext.QuickTips.init();
       this.loadLayout();
       this.enableHistory();
       app.manager('dashboard');
       return this;
   },
   
   home: function(){
       this.dispatchSilently('dashboard');
   },
   
   loadLayout: function(){
       this.mask = Extriajs.bodyMask;
       this.layout = new Extriajs.base.components.ViewPort();
       this.fireEvent('layoutLoaded');
   },
   
   enableHistory: function(){
       //enable Ext.History
       Ext.getBody().createChild({
           tag: 'form',
           action: '#',
           cls: 'x-hidden',
           id: 'history-form',
           children: [{
               tag: 'div',
               children: [{
                   tag: 'input',
                   id: Ext.History.fieldId,
                   type: 'hidden'
               }, {
                   tag: 'iframe',
                   id: Ext.History.iframeId
               }]
           }]
       });

       Ext.History.init();
       Ext.History.on('change', this.dispatchFromHistory, this);
   },
   
   addManager: function(name){
       Extriajs.base.Manager.superclass.addManager.apply(this, arguments);
       this.managed[name].contentArea = this.layout.contentArea();
   },
   
   statusMessage: function(message) {
       return this.layout.statusBar().message(message);
   }
});

Ext.reg('extria-base-manager', Extriajs.base.Manager);