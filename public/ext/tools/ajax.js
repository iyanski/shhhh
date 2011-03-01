// Ajax-specific tools.
Ext.namespace('Extriajs.tools.ajax');

Extriajs.tools.ajax = {
    normalizedJson: function(config){
        var scope = config.scope || this;
        var success = config.success || Ext.emptyFn;
        var failure = config.failure || function(json){
            var errors = json.errors;
            if(errors && errors.length > 0){
                Extriajs.tools.Msg.error(errors);
            }
            else {
                Extriajs.tools.Msg.error(['An error occurred. Server did not explain why.']);
            }
        };
        
        var dispatch = function(r){
            var json = Extriajs.tools.parseJSON(r.responseText);
            json.success ? success.apply(scope, [json]) : failure.apply(scope, [json]);
        };
        
        Ext.Ajax.request(Ext.apply(config, {
            success: dispatch,
            failure: dispatch
        }));
    }
};