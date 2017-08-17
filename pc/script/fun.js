//-------弹出对话框	
function prompt_fun(a){
	              $(a).after("<div id='Layer1'></div>"); 
				  $(a).css({left:'50%'});
				  $('#Layer1').fadeTo("fast",0.05); 
				  $(a).show();
				  //$(a).fadeIn("slow"); 
				  $('#Layer1').click(function(){
					  close_prompt_fun(a);
					  })	
	}
function close_prompt_fun(a){
	              //$(a).fadeOut("fast"); 
				  $(a).hide();
				  if($('.sqxqbgLayer2').length>0){
					  $('.sqxqbgLayer2').hide();
					  }
				  $('#Layer1').fadeOut("slow",function(){
					  $('#Layer1').remove();
					  }); 
	}