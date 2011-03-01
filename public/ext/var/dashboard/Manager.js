Ext.namespace('Extriajs.dashboard.Manager');

Extriajs.dashboard.Manager = Ext.extend(Extriajs.base.AbstractController, {
	name: 'dashboard',
	mainId: 'dashboard_id',
	
	constructor: function (){
	    Ext.Ajax.on('requestexception', this.handleRequestException, this); 
		this.auth();
	    Extriajs.dashboard.Manager.superclass.constructor.apply(this, arguments);
	},
	
	//
	auth: function (){
	    var me = this;
	    if(!this.top().currentUser()){
    	    Extriajs.tools.ajax.normalizedJson({
                url: '/api/session.json',
                method: 'get',
                scope: this,
                success: function (json) {
                    //Extriajs.tools.authenticity_token(json.authenticity_token);
                    Ext.Ajax.extraParams = Ext.Ajax.extraParams || {};
                    //Ext.Ajax.extraParams.authenticity_token = Extriajs.tools.authenticity_token();
                    if (!me.is_active_timer) {
                	    //start the timer
                        //check every 3 mins
                        me.is_active_timer = {
                            run: function (){
                                me.auth();
                            },
                            interval: 1000 * 60 * 3//3 minutes
                        };

                        Ext.TaskMgr.start(me.is_active_timer);
                        //this.loadUser(json.user);
                        //this.loadContact(json.contact);
                        this.start();
                	}
                	
                },
                failure: function (json) {
                    this.top().mask.hide();
                    //Extriajs.tools.authenticity_token(json.authenticity_token);
                    //loginWindow = Ext.create({xtype:'extria-dashboard-loginwindow'});
                    //loginWindow.show();
					window.location = '/users/sign_in';
                }
            }, this);
    	}
    	
	},
	
	unAuth: function () {
	    window.location = '/users/sign_out';
	},
	
	/*
	loadUser: function (user){
	  this.top().currentUser(new Extriajs.dashboard.data.User(user));
	},
	
	loadContact: function (contact){
	  this.top().currentContact(new Extriajs.dashboard.data.Contact(contact));
	},
	*/
	
	start: function (json) {
        var app = this.top();
        app.layout.addMenuItems();
        app.dispatchFromHistory();
        app.mask.hide();
    },
	
	handleRequestException: function (conn, response, opt) {
	    //console.log(response.status);
        switch(response.status) {
            case 403:
                var json = Extriajs.tools.parseJSON(response.responseText);
                if(json.reason) {
                    Extriajs.tools.Msg.error(json.reason);
                } else {
                    this.getLoginPrompt().show();
                    Ext.TaskMgr.stopAll();
                }
                break;
            case 500:
                app.statusMessage("An Error Has Occured");
                break;
            case 0:
                app.statusMessage("The Host Is Unreachable");
                break;
        }
    },
	
	getLoginPrompt: function () {
        if(!this.loginPrompt) {
            this.loginPrompt = new Extriajs.dashboard.components.LoginWindow();
        }
        return this.loginPrompt;
    },
	//
	home: function (){
	    this.replace({
	        id: this.mainId,
	        xtype: 'extria-dashboard-top'
	    });
	}

});

Ext.reg('extria-dashboard-manager', Extriajs.dashboard.Manager);