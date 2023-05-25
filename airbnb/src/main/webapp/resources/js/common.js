$(document).on("click", "input[type=checkbox].checkbox_all", function(e){
	var isCheck = $(e.target).is(":checked");
	var checkboxName = $(e.target).attr('name');
	if(isCheck){
		$(`input[name=${checkboxName}]`).prop("checked", true);
	}else{
		$(`input[name=${checkboxName}]`).prop("checked", false);
	}
});

$(document).on("click", "input[type=checkbox]", function(e){
	var checkboxName = $(e.target).attr('name');
	var checkboxes = $(`input[name=${checkboxName}]`).not(".checkbox_all");
	var checkboxes_checked = $(`input[name=${checkboxName}]:checked`).not(".checkbox_all");
	
	if(checkboxes.length == checkboxes_checked.length){
		$(`input[name=${checkboxName}].checkbox_all`).prop('checked', true);
	}else{
		$(`input[name=${checkboxName}].checkbox_all`).prop('checked', false);
	}
});



function checkLogin(isLogin){
	if(isLogin){
		gotoReservation();
	}else{
		alert("로그인 후 이용해주세요.");
		return;
	}
}

function getLodgingDetailView(l_id){
	location.href="/lodging/"+l_id;
}

function formatString(str){
	str = str.replaceAll("<", "&lt;");
    str = str.replaceAll(">", "&gt;");
    str = str.replaceAll("\"", "&quot;");
    str = str.replaceAll("'", "&#39;");

	return str;
}
