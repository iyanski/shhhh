Ext.namespace('Extriajs.my_account.components');

Extriajs.my_account.components.ChangePassword = Ext.extend(Ext.grid.Panel, {
    initComponent: function() {
        
        var config = {
            frame: true,
            title: 'Change Password',
            items: [{
                frame: true,
                ref: 'form',
                xtype: 'form',
                width: 270,
                url: '/extria/user/change_password',
                defaults: {
                    xtype: 'textfield'
                },
                items: [{
                    fieldLabel: 'Password',
                    name: 'user[password]',
                    inputType: 'password',
                    enableKeyEvents: true,
                    allowBlank: false,
                    listeners:{
                        keypress: function(n, e){
    						if(e.button == 12){
    							this.changePassword();
    						}
    					},
                        scope: this
                    }
                }, {
                    fieldLabel: 'Password Confirmation',
                    inputType: 'password',
                    name: 'user[password_confirmation]',
                    enableKeyEvents: true,
                    allowBlank: false,
                    listeners:{
                        keypress: function(n, e){
    						if(e.button == 12){
    							this.changePassword();
    						}
    					},
                        scope: this
                    }
                },{
                    inputType: 'hidden',
                    name: 'authenticity_token',
                    value: Extriajs.tools.authenticity_token()
                }],
                buttons: [{
                    text: 'Submit',
                    handler: this.changePassword,
                    scope: this
                }]
            }]
        };
        
        Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.my_account.components.ChangePassword.superclass.initComponent.apply(this);
    },
    
    changePassword: function () {
        var me = this;
        me.form.getForm().submit({
            success: function(form, action) {
                //me.ownerCt.ownerCt.fireEvent('aftercreate');
                me.form.getForm().reset();
                Extriajs.tools.Msg.info(action.result.message);
            },
            failure: function(form, action) {
                //Extriajs.tools.authenticity_token(Extriajs.tools.parseJSON(action.response).authenticity_token);
                //form.setValues({authenticity_token: Extriajs.tools.authenticity_token()});
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Extriajs.tools.Msg.error(['Form fields may not be submitted with invalid values']);
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Extriajs.tools.Msg.error('Failure', 'Ajax communication failed');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                       Extriajs.tools.Msg.error(action.result.errors);
                }
            }
        }, me);
    }
});

Ext.reg('extria-my_account-changepassword', Extriajs.my_account.components.ChangePassword);
