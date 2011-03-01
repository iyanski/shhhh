Ext.namespace('Extriajs.dashboard.components');

Extriajs.dashboard.components.Top = Ext.extend(Ext.Panel, {
    initComponent: function() {
        var config = {
            title: "Dashboard",
            frame: true,
            border: false,
            autoScroll: true,
            items: []
        };
        
        Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.dashboard.components.Top.superclass.initComponent.apply(this);
        //this.on('render', this.loadStatistics, this);
    }
});

Ext.reg('extria-dashboard-top', Extriajs.dashboard.components.Top);