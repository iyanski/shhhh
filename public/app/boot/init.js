Ext.ns('Extriajs');
Extriajs.init = function(){
    Extriajs.bodyMask = new Ext.LoadMask(Ext.getBody(), { msg: String.format('{0}...', 'Loading')}); 
    //Extriajs.bodyMask.show();
    Extriajs.spotlight = new Ext.ux.Spotlight({easing: 'easeOut', duration: 0.3});
	Extriajs.Alerter = new Ext.App({});
    app = new Extriajs.base.Manager();
    app.bootstrap();
};