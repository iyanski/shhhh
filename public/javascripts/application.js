// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
// JavaScript Document
function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

