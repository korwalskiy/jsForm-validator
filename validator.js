$(document).ready(function() {

//Validation starts here
	$('.chk').addClass('isRqd').after('<span class="fmsg col-xs-6"></span>');
	$('.chk').blur(function(){checkError($(this));})
	$('.chk').focus(function(){clearMsg($(this));})
	$('.chk.photo, .chk.dropdown').change(function(){checkError($(this));})
	$('.chk.email').change(function(){validateEmail($(this));})
	$('#pword, #cpword').keyup(function(){comparePass();})
		
	function checkDate($s){
		if($('.ui-datepicker:hidden')){
			setTimeout(function(){
				if ($s.val()!='') { showErr($s,1); return true;}
				else { showErr($s,0); return false;} }, 200);
		}
	}
	function validateEmail($email){
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if( !emailReg.test( $email.val() ) || $email.val()=='') { showErr($email,0); return false;}
		 else { showErr($email,1); return true;}
	}
	function validatePhoto($img) {
		var regexPhoto = /\.(jpg|jpeg|png)$/i;
        if( !regexPhoto.test($img.val()) ){ showErr($img,0); return false; }
		else { showErr($img,1); return true; }
	}
	function validatePhone($ph) {
		var regexPhone = /^[0-9-+]+$/;
        if( !regexPhone.test($ph.val()) || $ph.val()=='' || $ph.val().length < 7 ){ showErr($ph,0); return false; }
		else { showErr($ph,1); return true; }
	}
	function validateDropdown($dp) {
        if( $dp.val() ==0 ){ showErr($dp,0); return false; }
		else { showErr($dp,1); return true; }
	}
	function validateDocFile($df) {
        //if( $df.val() ==0 ){ showErr($df,0); return false; }
		//else { showErr($df,1); return true; }
		showErr($df,1); return true
	}
	
	function comparePass(){
		var a=$('#pword').val(); var b=$('#cpword').val();
		if ((a =='') || ($('#pword').val().length < 5)) {showErr($('#pword'),0); return false;} else {showErr($('#pword'),1);}
		if (a != b){ showErr($('#cpword'),0); return false; }
		if (a == b) { showErr($('#cpword'),1); return true; }
	}
	function clearMsg($s){
		$s.removeClass('Err').siblings('span.fmsg').hide();
	}
	function checkError($s){
		if ($s.hasClass('date')) {checkDate($s);}
		 else if ($s.hasClass('photo')) {validatePhoto($s);}
		 else if ($s.hasClass('pword')) {comparePass();}
		 else if ($s.hasClass('email')) {validateEmail($s);}
		 else if ($s.hasClass('phone')) {validatePhone($s);}
		 else if ($s.hasClass('dropdown')) {validateDropdown($s);}
		 else if ($s.hasClass('docfile')) {validateDocFile($s);}
		 else if ($s.val()=='') { showErr($s,0); return false;}
		else { showErr($s,1); return true;}
	}
	function showErr($s,v){
		if(v==1) {$s.removeClass('Err isRqd').siblings('span.fmsg').removeClass('err').addClass('oky').html('Ok!').show();}
		 else {$s.addClass('Err isRqd').siblings('span.fmsg').removeClass('oky').addClass('err').html('Err!').show();}
	}
	function errInForm(){
		//btbobj.messenger('','There is an error in the form, please chk!');
	}

	$("#button").click(function(e){
		if( $('.chk').hasClass('isRqd')) {
			showErr($('.chk.isRqd'),0);
				if ($('body').hasClass('contactpg')) {
					$("#popupdiv .modal-body").html("Some required fields are blank or contain invalid input, please check!");
					$('#popupdiv').modal('show');}
				else {alert('Some required fields are blank, please check!');}
			return false;
		}
		if( $('.chk.email').hasClass('isRqd')) {showErr($(this),0); return false;}
		 else { $("#candidateform #pgmain form, #pgmain form").submit();
			if ($('form').hasClass('forms')){ $("form.forms").submit();}
			else if ($('form').hasClass('contactform')){ $("form.contactform").attr('action','feedback.php');}
			else if ($('form').hasClass('newhire')){ $("form.newhire").attr('action','carhire.php');}
			else if ($('form').hasClass('newassist')){ $("form.newassist").attr('action','pvassistance.php');}
			else if ($('form').hasClass('newinsure')){ $("form.newinsure").attr('action','travelinsure.php');}
		 }
	});
})