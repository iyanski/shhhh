Ext.namespace('MP.photos.components');

MP.photos.components.List = Ext.extend(Ext.Carousel,{
	initComponent: function(){
		var me = this;
		var store = new MP.data.Photo();
		var config = {
			loadingMask: true,
			style: 'background-color: #000',
			items:[]
		};
		
		Ext.apply(this, Ext.applyIf(this.initialConfig, config));
		MP.photos.components.List.superclass.initComponent.apply(this);
		this.store = store
		this.on('beforecardswitch', function(_, n_, o_, i){
			if((i > me.getActiveIndex()) && (me.items.length < (me.getActiveIndex() + 4))){
				me._loadPhoto(me.photo_records[i + 4]);
			}
		});
		
		this.store.on('load', function(_, records){
			var rec = [];
			if(records.length > 0){
				for(x in records){
					rec[x] = records[x];
					if(x<4){
						me._loadPhoto(rec[x]);
					}
				}
			}
			me.photo_records = rec;
			me.ownerCt.delegateAction('loadPhotos', { 
				record: records.length
			});
		});
	},
	
	_loadPhoto: function(record){
		var me = this;
		if(record){
			me.add(new Ext.Panel({
				html: "<image align='center' src='http://www.drewaltizer.comhttp://www.drewaltizer.com/mediapanel/photo.php?id=" + record.get('photo_id') + "&i=3' width='320'/>"
			}));
			me.doLayout();
		}
	}
});

Ext.reg('mp-photos-list', MP.photos.components.List);