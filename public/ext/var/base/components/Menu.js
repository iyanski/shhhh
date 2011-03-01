Ext.namespace('Extriajs.base.components.Menu');

Extriajs.base.components.Menu = Ext.extend(Ext.Toolbar, {
    initComponent: function() {
        var config = {
            items: []
        };

        Ext.apply(this, Ext.applyIf(this.initialConfig, config));
        Extriajs.base.components.Menu.superclass.initComponent.apply(this);
    },

    /**
     * Add the menu items depending on user permissions. This is called
     * from a few different places, and that might not be a good thing.
     */
    addMenuItems: function() {
        var items = [];
        var menu = {
			Dashboard: 'dashboard',
	        Events: 'posts',
			Users: 'users',
			Distribution: 'distribution',
			Promotions: 'promotions',
			Options: 'options'
        };
        
        var menu_icons = {
            Dashboard: 'house',
	        Events: 'calendar',
			Users: 'group',
			Distribution: 'folder',
			Promotions: 'asterisk_orange',
			Options: 'cog'
        };
        
        
        for (item in menu) {
            if (menu.hasOwnProperty(item)) {
                var value = menu[item];
                var icon_name = menu_icons[item];
                items.push({
                    text: item,
                    handler: Extriajs.tools.handlers.dispatch(value),
                    icon: icons.silk(icon_name)
                }, '-');
            }
        }
		items.push({
			text: 'Reports',
			icon: icons.silk('report'),
			menu: [{
				text: 'Sales Orders',
				icon: icons.silk('cart'),
				listeners: {
					click: function(){}
				}
			}, 
			{
				text: 'Sold Photos',
				icon: icons.silk('photos'),
				listeners: {
					click: function(){}
				}
			},
			{
				text: 'Sales Invoices',
				icon: icons.silk('table'),
				listeners: {
					click: function(){}
				}
			}]
		});
		items.push({
			text: 'View Website',
			icon: icons.silk('world'),
			listeners: {
				click: function(){
					window.location.href = "/";
				}
			}
		});
        items.push('->');
        items.push({
		    id: 'about-menu',
            icon: icons.silk('information'),
            handler: this.toggleAboutWindow,
            scope: this
        });
		
        this.removeAll();
        this.add(items);
        this.doLayout();
    },
    
    toggleAboutWindow: function (){
	    var win = this.theAbout();
        win[win.hidden ? 'show' : 'hide']();
	},
	
	theAbout: function() {
	    if(!this.aboutWindow) {
            this.aboutWindow = new Ext.Window({
                title: 'About',
                width: 200,
                height: 120,
                padding: 10,
                closable: false,
                closeAction: 'hide',
                draggable: false,
                data: {
                    application_version: Extriajs.Config.application_version,
                    application_name: Extriajs.Config.application_name,
                    company: Extriajs.Config.company,
                    site: Extriajs.Config.site,
                    contact_email: Extriajs.Config.contact_email,
                    company_site: Extriajs.Config.company_site,
                    copyright: Extriajs.Config.copyright,
                    legal: Extriajs.Config.legal
                },
                tpl: new Ext.XTemplate([
                    '<div class="about">',
                        '<p><a href="{site}">{application_name}</a></p>',
                        '<p>Version: {application_version}</p>',
                        '<p>Email: <a href="mailto:{contact_email}">{contact_email}</a></p>',
                        '<p>{copyright} <a href="{company_site}" target="_blank">{company}</a></p>',
                        '<p>{legal}</p>',
                    '</div>'
                ]),
                
                align: function() {
                    this.alignTo(Ext.get('about-menu'), 'bl', [-178,0]);
                }
            });

            this.aboutWindow.on({
                resizable: false,
                scope: this.aboutWin,
                show: this.aboutWindow.align
            });

            app.layout.on('resize', function() {
                this.align.defer(150, this);
            }, this.aboutWindow);
        }
        return this.aboutWindow;
	}
});

Ext.reg('extria-menu', Extriajs.base.components.Menu);