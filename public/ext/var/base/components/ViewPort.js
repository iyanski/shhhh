Ext.namespace('Extriajs.base.components');

Extriajs.base.components.ViewPort = Ext.extend(Ext.Viewport, {
    initComponent: function() {
           var config = {
               layout: 'fit',
               items: [{                   
                        xtype: 'panel',
                        headerCfg: {
                            
                        },
                        tbar: {
                            xtype: 'extria-menu'
                        },
                        cls: 'main-body',
                        layout: 'card',
                        border: false,
                        listeners: {
                            afterrender: Extriajs.tools.handlers.addMask
                        },
                        bbar: {
                            xtype: 'extria-statusbar'
                        }
                    }
                ]
           };

           Ext.apply(this, Ext.applyIf(this.initialConfig, config));
           Extriajs.base.components.ViewPort.superclass.initComponent.apply(this);
       },

       statusBar: function() {
           return this.contentArea().getBottomToolbar();
       },

       contentArea: function() {
           return this.items.itemAt(0);
       },

       addMenuItems: function() {
           this.items.itemAt(0).getTopToolbar().addMenuItems();
       }
});