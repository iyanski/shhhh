Ext.namespace('Extriajs.categories.components');

Extriajs.categories.components.Create = Ext.extend(Ext.Window, {
    initComponent: function() {
		var me = this;
		
		var config = {
			title: 'Add New Category',
			layout: 'fit',
			bodyStyle: 'padding:5px',
			width: 300, height: 130,
			modal: true,
			items:[{
				ref: 'form',
				layout: 'form',
				frame: true,
				items: [{
					ref: 'name',
					xtype: 'textfield',
					fieldLabel: 'Name',
					name: 'name'
				}],
				buttons: [{
					text: 'Save',
					listeners: {
						click: function(){
							me.addCategory();
						}
					}
				}]
			}]
		};
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.categories.components.Create.superclass.initComponent.apply(this);
		this.addEvents('success');
	},
	addCategory: function(){
		Ext.Ajax.request({
			url: '/api/categories.json',
			method: 'POST',
			params: {
				"category[name]": this.form.name.getValue()
			},
			scope: this,
			success: function(msg){
				var response = Ext.util.JSON.decode(msg.responseText);
				if(response.success){
					this.fireEvent('success');
				}
			}
		});
	}
});
Ext.reg('extria-categories-create', Extriajs.categories.components.Create);