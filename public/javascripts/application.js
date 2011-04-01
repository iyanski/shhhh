// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
// JavaScript Document
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

jQuery(function(){
	jQuery(".add_to_cart").click(function(){
		var item_id = jQuery(this).attr('item_id');
		jQuery.ajax({
			type: 'post',
			url: '/cart.json',
			data: 'photo_id=' + item_id,
		});
	});
	jQuery(".add_to_favorites").click(function(){
		jQuery.ajax({
			url: '/home/index'
		});
	});
});