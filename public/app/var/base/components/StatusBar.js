Ext.namespace('Extriajs.base.StatusBar');

Extriajs.base.StatusBar = Ext.extend(Ext.ux.StatusBar, {
	initComponent: function(){
		var me = this;
		var config = {
			text: '...',
			items: [ {
    			text: 'Logout',
    			iconCls: 'extria-logout',
    			handler:function(){
    			    //app.manager('dashboard').unAuth();
    			}
    		}]
		};
		
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.base.StatusBar.superclass.initComponent.apply(this);
        this.on('render', this.clearText, this);
        
	},
	
	clearText: function(){
	    var me = this;
	    me.task = me.task || new Ext.util.DelayedTask(function(){
            me.setText('');
        });
        me.task.delay(5000); 
	},
	
	message: function(message){
	    var me = this;
        me.setText(message);
        this.clearText();
	}
});

Ext.reg('extria-statusbar', Extriajs.base.StatusBar);