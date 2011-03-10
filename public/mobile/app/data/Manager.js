Ext.namespace('MP.data');

Ext.regModel('Album', {
    fields: [
		{ name: 'album_name', type: 'string' },
		{ name: 'album_id', type: 'integer' }
	]
});

Ext.regModel('Event', {
    fields: [
		{ name: 'event_name', type: 'string' },
		{ name: 'event_id', type: 'integer' },
		{ name: 'date_created', type: 'string' },
		{ name: 'display_type', type: 'string' }
	]
});

Ext.regModel('Photo', {
    fields: [
		{ name: 'photo_id', type: 'integer' },
		{ name: 'filename', type: 'string' },
		{ name: 'caption', type: 'string' }
	]
});