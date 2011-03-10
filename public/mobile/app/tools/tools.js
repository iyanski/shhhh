Ext.apply(MP.tools, {
    objectFromPath: function(path, lookup) {
        return path.split('.').reduce(function(o, p) {
            if(o && o.hasOwnProperty(p)) {
                return o[p];
            }
        }, lookup || window);
    },
    
    parseJSON: function(text) {
        try {
            return Ext.decode(text);
        } catch(e) {
            return {};
        }
    },
    
    authenticity_token: function(authenticity_token){
        if(authenticity_token){
            window.authenticity_token = authenticity_token;
        }
        return window.authenticity_token;
    },
    
    namer: function (name) {
        return function (n) {
            return '{0}[{1}]'.format(name, n);
        }
    }
});