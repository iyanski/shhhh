// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
// JavaScript Document
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

$(function(){
	$(".add_to_favorites").click(function(){
		var item_id = $(this).attr('item_id');
		$.ajax({
			url: '/home/index',
			data: 'id=' + item_id,
		});
	});
	$(".paper_size").change(function(){
		var item_id = $(this).attr('item_id');
		if($(this).val() != ""){
		  $.ajax({
		  	type: 'post',
		  	url: '/cart/change_paper_size',
		  	data: 'cart_item_id=' + item_id + '&id=' + $(this).val(),
		  });
		}
	});
	$(".paper_type").change(function(){
		var item_id = $(this).attr('item_id');
		if($(this).val() != ""){
		  $.ajax({
		  	type: 'post',
		  	url: '/cart/change_paper_type',
		  	data: 'id=' + $(this).val(),
		  });
		}
	});
	$('.quantity').change(function(){
		var item_id = $(this).attr('item_id');
		$.ajax({
			type: 'post',
			url: '/cart/change_quantity',
			data: 'cart_item_id=' + item_id + '&quantity=' + $(this).val(),
		});
	});
})

function clickIE4(){
	if (event.button==2){
		alert("Copyright 2009 Drew Altizer");
		return false;
	}
}

function clickNS4(e){
	if (document.layers||document.getElementById&amp;&amp;!document.all){
		if (e.which==2||e.which==3){
			alert("Copyright 2009 Drew Altizer");
			return false;
		}
	}
}

if (document.layers){
	document.captureEvents(Event.MOUSEDOWN);
	document.onmousedown=clickNS4;
}
else if (document.all&amp;&amp;!document.getElementById){
	document.onmousedown=clickIE4;
}

document.oncontextmenu=new Function("alert('Copyright 2009 Drew Altizer');return false")