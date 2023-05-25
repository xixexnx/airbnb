var idChk = false;
var pwChk = false;
var patternChk = false;
var nameChk = false;
var phoneChk = false;

$(function(){
	
	$("input[name=loginPw]").on("keyup", function(key){
        if(key.keyCode==13) {
          	chkUserId();
        }
	});
	
	$("input[name='id']").on("keyup", function(){
		idChk = false;
		chkSpace($("input[name=id]"));
		
		var id = $("input[name=id]").val();
		var pattern = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		
		if(pattern.test(id)){
			chkId();
			idChk = true;
			$(".id_msg").html("");
		}else{
			$(".id_msg").html("이메일 형식에 맞게 입력하세요.");
		}
		
		btnActive();
	});

	$("input[name='pw']").on("keyup", function(){
		patternChk = false;
		chkSpace($("input[name='pw']"));
		
		var pw = $("input[name='pw']").val();
//		var pattern =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
		var pattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])[A-Za-z\d@$!%*?&].{8,25}$/;
		var msg = "";
		
		if(pw.length >= 8 && pattern.test(pw)){
			patternChk = true;
		}
		
		if(pw.replaceAll(" ","").length==0){
			msg = "필수 정보입니다.";
		}else{
		 	msg = "8~16자 영문 대 소문자, 숫자 그리고 특수문자(!@#$%^*+=-)를 사용하세요.";
		}
		
		if(!patternChk){
			$(".pw_msg").html(msg);
			$(".pw_msg").show();
		}else{
			$(".pw_msg").html("");
			$(".pw_msg").hide();
		}		
	
		pwCheck();
		btnActive();
	});

	$("input[name='pwchk']").on("keyup", function(){
		pwChk = false;
		if(chkSpace($("input[name='pwchk']"))){
			pwChk = true;
		}
		pwCheck();
		btnActive();
	});
	
	$("input[name=name]").on("keyup", function(e){
		var pattern = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;
		var nameVal = $("input[name=name]").val();
		nameChk = false;
		
		if(!pattern.test(nameVal)){
			$(e.target).val(nameVal.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g,""));
		}
		
		if(chkSpace($("input[name=name]"))){
			nameChk = true;
		}	
		btnActive();
	});
	
	$(".form_div_phone input").on("keyup", function(e){
		phoneChk = false;
		var pattern = /^[0-9]+$/;
		var inputNum = $(e.target).val();
		
		if(!pattern.test(inputNum)){
			$(e.target).val(inputNum.replace(/[^0-9]/g,""));
		}
		
		if($("input[name=phone1]").val().length == 3 && $("input[name=phone2]").val().length == 4 && $("input[name=phone3]").val().length ==4){
			phoneChk = true;
		}
		btnActive();
	});
});

function pwCheck(){
	pwChk = false;
	var pw = $("input[name='pw']").val();
	var pwchk = $("input[name=pwchk]").val();
	if($("input[name='pwchk']").val().replaceAll(" ", "").length > 0){
		if(pw == pwchk){
			pwChk = true;
			$(".pwchk_msg").html("");
		}else{
			$(".pwchk_msg").html("비밀번호가 일치하지 않습니다.");			
		}
	}
}

function chkId(){
	var inputId = $("input[name='id']").val();
	
	$.ajax({
		type: 'GET',
		url: '/id',
		data: {'inputId': inputId},
		success: function(data){
			if(!data){
				idChk = false;
				var msg = "이미 존재하는 아이디입니다.";
				$(".id_msg").html(msg);
			}else{
				$(".id_msg").html("");
			}
		}
	});
}

function chkSpace(dom){
	var chk = false;
	if(dom.val().includes(" ")){
		dom.val(dom.val().replaceAll(" ",""));
		alert("공백은 입력하실 수 없습니다.");
	}else{
		chk = true;
	}
	return chk;
}

function btnActive(){
	if(idChk && pwChk && patternChk && nameChk && phoneChk){
		$("#air_register").attr("style", "background-color:rgba(226,15,86,0.85); color: white;");
		$("#air_register").removeAttr('disabled');
	}else{
		$("#air_register").attr("style", "background-color:rgb(235 235 235 / 67%);");
		$("#air_register").attr('disabled', 'disabled');
	}
}


function chkUserId(){
	if($(".login_form>input[name='loginId']").val().replaceAll(" ", "").length == 0){
		$(".login_msg").html("아이디를 입력하시오.");
		$("input[name=loginId]").focus();
		return false;
	}
	if($(".login_form>input[name='loginPw']").val().replaceAll(" ", "").length ==0){
		$(".login_msg").html("비밀번호를 입력하시오.");
		$("input[name=loginPw]").focus();
		return false;
	}
	
	$.ajax({
		type: 'POST',
		url: '/login',
		data: 'id='+ $("input[name='loginId']").val() + '&pw=' + $("input[name='loginPw']").val(),
		success: function(data){
			if(data){
				window.location.href = '/';
			}else{
				$(".login_msg").html("아이디나 비밀번호가 일치하지 않습니다.");
			}
		}
	});
}

function join(){
	var phoneNum = $("input[name=phone1]").val() + "" + $("input[name=phone2]").val() + "" + $("input[name=phone3]").val();
	
	$.ajax({
		type: 'POST',
		url: '/join',
		data: {
			"id": $("input[name=id]").val(),
			"pw": $("input[name=pw]").val(),
			"name": $("input[name=name]").val(),
			"phone": phoneNum
		},
		success: function(data){
			alert("회원가입이 완료되었습니다. 로그인 창으로 이동합니다.");
			initJoinForm();
			$(".modal_register").removeClass('modal-on');
			$(".modal_login").addClass("modal-on");
		}
	});
}

function initJoinForm(){
	$(".modal_register input[type=text]").val('');
	$(".modal_register input[type=password]").val('');
	$("#air_register").attr("style", "background-color:rgb(235 235 235 / 67%);");
	$("#air_register").attr('disabled', 'disabled');
}