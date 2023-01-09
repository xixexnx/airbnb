$(function(){
    getThemeNav();
	getAllLodging();
	
	$(document).on("click", function(e){
		if($(e.target)[0].className != null && $(e.target)[0].className != ""){
		    if(($(e.target)[0].className.toString()).includes("modal")){
				$(e.target).hide();
			}
		}
	});
	
	$(".joinBtn").on("click", function(){
		$(".modal_register").show();
	});
	
	$(".loginBtn").on("click", function(){
		$(".modal_login").show();
	});
	
    $(".login_header span").on("click", function(){
        $(".modal_login").hide();
    });

 	$(".register_header span").on("click", function(){
        $(".modal_register").hide();
    });
	
	$("#slideLeft").on("click", function(){
		var nowScroll = $("#theme_buttons").scrollLeft();
		var scroll = $("#theme_buttons").width() - 100;
		$("#theme_buttons").scrollLeft(nowScroll - scroll);
	});
	
	$("#slideRight").on("click", function(){
		var nowScroll = $("#theme_buttons").scrollLeft();
		var scroll = $("#theme_buttons").width() - 100;
		$("#theme_buttons").scrollLeft(nowScroll + scroll);
	});
	
	$(".gotoHostPage").on("click", function(){
		gotoHostPage();
	});
});

function showUserBox(){
	if($(".userBar").hasClass("on")){
		$(".userBar-menu").show();
		$(".userBar").removeClass("on");
	}else{
		$(".userBar-menu").hide();
		$(".userBar").addClass("on");
	}
}

function getThemeNav(){
    $.ajax({
        type: "GET",
        url: "theme",
        data: {},
        success: function(data){
            var str = "";
			data.forEach((i) => {
				str += `<button class="theme_btn" data-value="${i.T_ID}">
							<div style="padding:10px;">
								<img src="/image/theme/${i.T_ICON_ID}.jpg" width="25px"/>
							</div>
							${i.T_NAME}
						</button>`;
			})
			$("#theme_buttons").html(str);
        }
    });
}

function gotoHostPage(){
	location.href="host";
}

function getAllLodging(){
	$.ajax({
		type: "GET",
		url: "lodging",
		data: {},
		success: function(data){
			var str = "";
			for(var i in data){
				str += `<div class="picList_area" id="${data[i].l_id}" onclick="getLodgingDetailView(this.id)">
							<div class="pic_div">
								<img src="lodging/pic_url?url=${data[i].main_pic}" />
							</div>
							<div class="pic_title">${data[i].l_name}</div>
							<div class="pic_price">${data[i].basic_price}</div>
						</div>
						`;
			}
			
			$(".lodging_list_area").html(str);
		}
	});
}

function getLodgingDetailView(l_id){
	location.href="lodging/"+l_id;
}