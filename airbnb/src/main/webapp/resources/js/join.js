var idChk = false;
var pwChk = false;

$(function(){

	$("input[name='id']").on("keyup", function(){
		idChk = false;
		var id = $("input[name=id]").val();
		var pattern = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		
		if(pattern.test(id)){
			chkId();
			idChk = true;
		}else{
			$(".id_msg").html("이메일 형식에 맞게 입력하세요.");
		}
		btnActive();
	});
	
	$("input[name='pw']").on("keyup", function(){
		pwChk = false;
		var pw = $("input[name='pw']").val();
		var pattern =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
		var patternChk = false;
		var msg = "";
		
		if(pw.length >= 8 || pattern.test(pw)){
			patternChk = true;
		}
		
		if(pw.replaceAll(" ","").length==0){
			msg = "필수 정보입니다.";
		}else{
		 	msg = "8~16자 영문 대 소문자, 숫자를 사용하세요.";
		}
		
		if(!patternChk){
			$(".pw_msg").html(msg);
			$(".pw_msg").show();
		}else{
			$(".pw_msg").html("");
			$(".pw_msg").hide();
		}		
		btnActive();
	});

	$("input[name='pwchk']").on("keyup", function(){
		pwChk = false;
		var pw = $("input[name='pw']").val();
		var pwchk = $("input[name=pwchk]").val();
		if(pw == pwchk){
			pwChk = true;
			$(".pwchk_msg").html("");
		}else{
			$(".pwchk_msg").html("비밀번호가 일치하지 않습니다.");			
		}
		btnActive();
	});
	
	$(".form_div_phone input").on("keyup", function(e){
		var pattern = /^[0-9]+$/;
		var inputNum = $(e.target).val();
		
		if(!pattern.test(inputNum)){
			$(e.target).val(inputNum.replace(/[^0-9]/g,""));
		}
	});
});

function chkId(){
	var inputId = $("input[name='id']").val();
	
	$.ajax({
		type: 'POST',
		url: 'id',
		data: 'inputId='+ inputId,
		success: function(data){
			if(!data){
				var msg = "이미 존재하는 아이디입니다.";
				$(".id_msg").html(msg);
			}else{
				$(".id_msg").html("");
			}
		}
	});
}

function btnActive(){
	if(idChk && pwChk){
		$("#air_register").attr("style", "background-color:rgba(226,15,86,0.85); color: white;");
		$("#air_register").removeAttr('disabled');
	}else{
		$("#air_register").attr("style", "background-color:rgb(235 235 235 / 67%);");
		$("#air_register").attr('disabled', 'disabled');
	}
}