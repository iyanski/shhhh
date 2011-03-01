Ext.namespace('Extriajs.tools.Msg');

Extriajs.tools.Msg = {
    alert: function (msg) {
        return Extriajs.Alerter.setAlert("Notice", msg);
    },
    
    infoDisplay: function (message){
        return Ext.MessageBox.show({
            title: 'Info',
            msg: message,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
        });
    },
    
    info: function (message) {
        return this.alert(message);
    },
    
    error: function (errors) {
         return Ext.MessageBox.show({
             title: 'Error',
             msg: errors.join("<br />"),
             buttons: Ext.MessageBox.OK,
             icon:  Ext.MessageBox.ERROR
         });
    }
    
};