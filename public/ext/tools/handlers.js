Ext.namespace('Extriajs.tools');

Extriajs.tools.handlers = {
    addMask: function (cmp) {
      cmp.mask = new Ext.LoadMask(cmp.el, {
          msg: String.format('{0}...', 'loading')
      });
    },

    dispatch: function (token, args) {
      return app.dispatch.createDelegate(app, [token, args]);
    },
    
    /*
    * A convenience handler, that changes its inputValue to "0" when unchecked and "1" if checked,
    * this will make it play well with rails.
    */
    checkbox: function (cb, checked) {
        cb.inputValue = checked ? "1" : "0"; 
    },
    
    formFailure: function (form, action) {
        switch (action.failureType) {
            case Ext.form.Action.CLIENT_INVALID:
                Extriajs.tools.Msg.error(['Form fields may not be submitted with invalid values']);
                break;
            case Ext.form.Action.CONNECT_FAILURE:
                Extriajs.tools.Msg.error(['Ajax communication failed']);
                break;
            case Ext.form.Action.SERVER_INVALID:
                var errs = [];
                Ext.each(action.result.errors, function(error){
                    errs.push(error.join(" ").capitalize());
                });

                Extriajs.tools.Msg.error(errs);
        }
    }
};