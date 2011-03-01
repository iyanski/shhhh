Ext.apply(Ext, {
    forEach: function(o, fn, ctx) {
        ctx = ctx || this;
        if(Ext.isIterable(o)) {
            Ext.each(o, fn, ctx);
        } else {
            for(var p in o) {
                if(o.hasOwnProperty(p)) {
                    fn.call(ctx, o[p], p, o);
                }
            }
        }
    }
});