

Ext.override(Ext.form.Checkbox, {
    inputValue: '1'//,
    /*
    onRender : function (ct, position) {
        Ext.form.Checkbox.superclass.onRender.call(this, ct, position);
        if(this.inputValue !== undefined){
            this.el.dom.value = this.inputValue;
        }
        this.wrap = this.el.wrap({cls: 'x-form-check-wrap'});
    
        
        //rails apps need to post "0" value if they're not checked
        if (this.name) {
            this.wrap.createChild({tag: 'input', type: 'hidden', value: '0', name: this.name});
        }
        if(this.boxLabel){
            this.wrap.createChild({tag: 'label', htmlFor: this.el.id, cls: 'x-form-cb-label', html: this.boxLabel});
        }
        if(this.checked){
            this.setValue(true);
        }else{
            this.checked = this.el.dom.checked;
        }
        // Need to repaint for IE, otherwise positioning is broken
        if (Ext.isIE && !Ext.isStrict) {
            this.wrap.repaint();
        }
        this.resizeEl = this.positionEl = this.wrap;
        
    }*/
});
