//the only global variable
var app;

//the top-level namespace
Ext.ns('Extriajs');

//firefox non-debuggers gets to call empty functions
if(!window.console)
    window.console = {};
if(!Ext.isFunction(window.console.log))
    window.console.log = Ext.emptyFn;

Ext.CHART_URL = '/app/ext/3.2.0/resources/charts.swf';
