Ext.namespace('Extriajs.dashboard.components');

Extriajs.dashboard.components.LoginWindow = Ext.extend(Ext.Window, {
    initComponent: function() {
        
        var config = {
            frame: true,
            closable: false,
            resizable: false,
            draggable: false,
            title: 'Login',
            modal: true,
            width: 300,
            height: 130,
            layout: 'fit',
            tools: [{
                id: 'plus',
                handler: function () {
                    window.location.href = '/user';
                },
                qtip: "Sign Up"
            },{
                id: 'help',
                handler: function () {
                    window.location.href = '/user/forgot_password';
                },
                qtip: "Forgot Password"
            }],
            items: {
                frame: true,
                height: 130,
                xtype: 'form',
                ref: 'form',
                url: '/extria/sessions/create',
                defaults: {
                    xtype: 'textfield'
                },
                items: [{
                    fieldLabel: 'Email',
                    name: 'email',
                    vtype: 'email',
                    enableKeyEvents: true,
                    allowBlank: false,
                    listeners:{
                        keypress: function(n, e){
    						if(e.button == 12){
    							this.login();
    						}
    					},
                        scope: this
                    }
                }, {
                    fieldLabel: 'Password',
                    inputType: 'password',
                    enableKeyEvents: true,
                    name: 'password',
                    allowBlank: false,
                    listeners:{
                        keypress: function(n, e){
    						if(e.button == 12){
    							this.login();
    						}
    					},
                        scope: this
                    }
                },{
                    inputType: 'hidden',
                    name: 'authenticity_token',
                    value: Extriajs.tools.authenticity_token()
                }],
                buttons: [/*{
                    text: 'Forgotten password?',
                    handler: function(){
                        window.location.href = '/user/forgot_password'
                    }
                },*/{
                    text: 'Login',
                    handler: this.login,
                    scope: this,
                    icon: icons.silk('door_in')
                }]
            }
        };
        
        Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.dashboard.components.LoginWindow.superclass.initComponent.apply(this);
    },
    
    login: function(){
        var me = this;
        me.form.buttons[0].disable();
        me.form.getForm().submit({
            success: function(form, action) {
                //me.ownerCt.ownerCt.fireEvent('aftercreate');
                mpmetrics.track("login");
                me.form.getForm().reset();
                app.manager('dashboard').auth();
                me.form.buttons[0].enable();
                me.hide();
            },
            failure: function(form, action) {
                me.form.buttons[0].enable();
                //Extriajs.tools.authenticity_token(Extriajs.tools.parseJSON(action.response).authenticity_token);
                //form.setValues({authenticity_token: Extriajs.tools.authenticity_token()});
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Extriajs.tools.Msg.error(['Form fields may not be submitted with invalid values']);
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Extriajs.tools.Msg.error(['Ajax communication failed']);
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                       Extriajs.tools.Msg.error(action.result.errors);
                }
            }
        }, me);
    }
});

Ext.reg('extria-dashboard-loginwindow', Extriajs.dashboard.components.LoginWindow);
