Ext.namespace('Extriajs.base');

Extriajs.base.AbstractController = Ext.extend(Ext.util.Observable, {
    children: [],
    titles: {},
    name: 'noname',
    argumentSeparator: '/',

    constructor: function (controller) {
        this.managedBy = controller || null;
        this.managed = {};
        this.stores = {};

        this.addEvents(
            'beforedispatch',
            'dispatch'
        );
        
        Extriajs.base.AbstractController.superclass.constructor.apply(this);
    },
    
    manager: function (name) {
        var res =  name.split('.').reduce(function(manager, key) {
            if (manager.children.includes(key)) {
                if (!manager.managed[key]) {
                    manager.addManager(key);
                }
                return manager.managed[key];
            }
        }, this);
        return res;
    },

    updateHistory: function (token, args) {
        if(args) {
            token += this.argumentSeparator + this.encodeArguments(args);
        }
        Ext.History.add(token);
        return token !== Ext.History.getToken();
    },
    
    encodeArguments: function (args) {
        var enc = [];
        Ext.forEach(args, function (v, k) {
            if (v === true) {
                enc.push(k);
            } 
            else {
                if (v === false) {
                    v = 'off';
                }
                enc.push(k + ':' + v);
            }
        }, this);
        return enc.join(this.argumentSeparator);
    },
    
    addManager: function (name) {
        var oParts = [];
        if (this !== this.top()) {
            oParts.push(this.name);
        }
        oParts.push(name, 'Manager');
        var constructor = Extriajs.tools.objectFromPath(oParts.join('.'), Extriajs);
        this.managed[name] = new constructor(this);
        this.managed[name].name = name;
    },
    
    dispatchSilently: function (token, args) {
        var action = this.getDispatchAction(token);
        if (action) {
            // Provide an indication that this action is being dispatched
            // silently
            action.silent = true;
            if (this.canRun(action)) {
                return this.doAction(action);
            }
        }
    },
    
    top: function () {
        return this.managedBy ? this.managedBy.top() : this;
    },
    
    fireEvent: function () {
        var fireEvent = Extriajs.base.AbstractController.superclass.fireEvent;
        var fire = fireEvent.apply(this, arguments);
        var mgr = this.managedBy;

        while (mgr) {
            fireEvent.apply(mgr, arguments);
            mgr = mgr.managedBy;
        }

        return fire;
    },

    replace: function (config) {
        var component;
        var id = config.id;
        if (id) {
            //console.log('removing all');
            this.contentArea.removeAll();
            
            //console.log('adding elements');
            Ext.apply(config,{autoDestroy: true, manager: this});
            component = this.contentArea.add(config);
            
            this.contentArea.getLayout().setActiveItem(id);
            return component;
        }
    },
    
    canRun: function (action) {
        //this could be used for permissions
        return action && 
               action.manager.fireEvent('beforedispatch', action) !== false;
    },
    
    decodeHistory: function (history) {
        history = history || Ext.History.getToken();
        var hparts = history.split('/'), args, token;
        if (hparts.length) {
            token = hparts[0];
            args = {};
            Ext.forEach(hparts.slice(1), function (arg) {
                var argParts = arg.split(':');
                if (Ext.isDefined(argParts[1])) {
                    args[argParts[0]] = argParts[1];
                } 
                else {
                    args[argParts[0]] = argParts[1] === 'off' ? false : argParts[1];
                }
            });
        }
        return [token, args];  
    },
    
    dispatchFromHistory: function () {
        var action;
        var history = Ext.History.getToken();
        if (history) {
            var decoded = this.decodeHistory(history);
            var token = decoded[0];
            var args = decoded[1];
            if (token) {
                action = this.getDispatchAction(token, args);
                if (this.canRun(action)) {
                    return this.doAction(action);
                }
            }
        }

        // Default, fall-through action
        return this.home();
    },
    
    dispatch: function (token, args) {
        var action = this.getDispatchAction(token);
        if (this.canRun(action)) {
            if (!this.updateHistory(token, args)) {
                return this.doAction(action);
            }
        }
        else {
            //alert('Unable to dispatch!');
            this.dispatchSilently('dashboard');
        }
    },
    
    doAction: function (action) {
        var res = action.action.call(action.manager, action.args);
        action.manager.fireEvent('dispatch', action);
        return res;
    },

    currentUser: function (user){
        if (user) {
            this.user = user;
        }
        return this.user;
    },
    
    currentContact: function (contact){
        if (contact) {
            this.contact = contact;
        }
        return this.contact;
    },

    getDispatchAction: function (token, args) {
        var action, actionName, manager,
            args = args || {},
            top = this.top(),
            parts = token.split('.');

        if (top.manager(parts.join('.'))) {
            manager = parts;
            actionName = 'home';
        } 
        else {
            manager = parts.init();
            actionName = parts.last();
        }

        if ((manager = top.manager(manager.join('.'))) && 
            (action = manager[actionName])) {
            return {
                action: action,
                actionName: actionName,
                manager: manager,
                args: args,
                silent: false
            };
        }
    }
});
