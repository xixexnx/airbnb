var max_people = 0;

$(function(){
    getThemeNav();
	getAllLodging();
	
	$(".login_box, .register_box").on("click", function(){
		return false;	
	});
	
	$(".modal").on("click", function(e){
		$(".modal").removeClass("modal-on");
	});
	
	$(document).on("click", ".theme_btn", function(e){
		var target = $(e.target).closest(".theme_btn");
		var isTrue = !$(target).hasClass("on");
		
		$(".theme_btn").removeClass("on");
		
		if(isTrue){
			$(target).addClass("on");
			LodgingListForTheme($(target).attr("data-value"));
		}else{
			getAllLodging();
		}
	});
	
	$(".joinBtn").on("click", function(){
		chkModalOn();
		$(".userBar-menu").hide();
		$(".modal_register").addClass("modal-on");
	});
	
	$(".loginBtn").on("click", function(){
		chkModalOn();
		$(".userBar-menu").hide();
		$(".modal_login").addClass("modal-on");
	});
	
    $(".login_header span").on("click", function(){
		$(".modal_login").removeClass("modal-on");
    });

 	$(".register_header span").on("click", function(){
		$(".modal_register").removeClass("modal-on");
    });
	
	$("#slideLeft").on("click", function(){
		var nowScroll = $("#theme_buttons").scrollLeft();
		var scroll = $("#theme_buttons").width() - 100;
	   $("#theme_buttons").animate({ scrollLeft: nowScroll - scroll }, 500);
	});
	
	$("#slideRight").on("click", function(){
		var nowScroll = $("#theme_buttons").scrollLeft();
		var scroll = $("#theme_buttons").width() - 100;
	   $("#theme_buttons").animate({ scrollLeft: nowScroll + scroll }, 500);
	});
	
	$(".gotoHostPage").on("click", function(){
		gotoHostPage();
	});
	
	$(".modal-wrap").on("click", function(){
		$(".modal-content").hide();
		$(".modal-content").removeClass("modal-on");
	});
	
	$(".modal-wrap-search").on("click", function(){
		initSearchBar(checkSearchBarValue());
	});
	
	$(".lodging_location_opt").on("click", function(){
		$(".detail_searchBar>div").removeClass("on");
		$(".lodging_location_opt").addClass("on");
		$(".search-option-div").hide();
		$("#search-location").show();
		$(".modal-wrap-search").fadeIn(500);
		$(".modal-wrap-search").addClass("modal-on");
	});
	
	$(".lodging_calendar_opt").on("click", function(){
		$(".detail_searchBar>div").removeClass("on");
		$(".lodging_calendar_opt").addClass("on");
		$(".search-option-div").hide();
		$("#search-calendar").show();
		$(".modal-wrap-search").fadeIn(500);
		$(".modal-wrap-search").addClass("modal-on");
	});
	
	$(".lodging_guest_opt").on("click", function(){
		$(".detail_searchBar>div").removeClass("on");
		$(".lodging_guest_opt").addClass("on");
		$(".search-option-div").hide();
		$("#search-guest").show();
		$(".modal-wrap-search").fadeIn(500);
		$(".modal-wrap-search").addClass("modal-on");
	});
	
	$("#search_location_input").on("keyup", function(){
		$("#location-selectBox").val("");
		$("#location-selectBox-gu").val("");
		$("#location-selectBox-gu").hide();
		
		var search_val = $("#search_location_input").val();
		if(search_val.length > 0){
			$("#select-search").hide();			
			$("#input-search").show();
		}else{
			$("#select-search").show();			
			$("#input-search").hide();
		}
		inputSearchCity(search_val.replaceAll(" ", ""));
	});
	
	$(".modifyReservationGuest.minus-btn").on("click", function(){
		var guest_no = $("#guset_no").html();
		if(guest_no > 1){			
			$(".modifyReservationGuest.minus-btn").attr("disabled", false);
			$(".modifyReservationGuest.minus-btn").attr("style", "color: black;");
			$("#guset_no").html(parseInt(guest_no)-1);
		}else if(guest_no == 1){
			$(".modifyReservationGuest.minus-btn").attr("disabled", "disabled");
			$(".modifyReservationGuest.minus-btn").attr("style", "color: #717171;")
			alert("최소 인원은 1명입니다.");
		}
	});
	
	$(".modifyReservationGuest.plus-btn").on("click", function(){
		var guest_no = $("#guset_no").html();

		if(max_people <= guest_no){
			alert(`숙박 가능 최대 인원 수는 ${max_people}명입니다.`);
			return false;
		}else{
			$("#guset_no").html(parseInt(guest_no)+1);
			$(".modifyReservationGuest.minus-btn").attr("disabled", false);
			$(".modifyReservationGuest.plus-btn").attr("style", "color: black;");
		}
	});
	
	
	$("#search-guest .minus-btn").on("click", function(){
		var guest_no = $("div[name=search_guest_no]").html();
		$("div[name=search_guest_no]").html(parseInt(guest_no)-1);
		if(guest_no > 1){			
			$("#search-guest .minus-btn").attr("disabled", false);
			$(".lodging_guest_opt>div>span").html("게스트 " + (parseInt(guest_no)-1) + "명");
			$(".lodging_guest_opt>div>span").attr("style", "color: black;");
		}else if(guest_no == 1){
			$("#search-guest .minus-btn").attr("disabled", "disabled");
			$(".lodging_guest_opt>div>span").html("게스트 추가");
			$(".lodging_guest_opt>div>span").attr("style", "color: #717171;")
		}
	});

	$("#search-guest .plus-btn").on("click", function(){
		var guest_no = $("div[name=search_guest_no]").html();
		$("div[name=search_guest_no]").html(parseInt(guest_no)+1);
		$("#search-guest .minus-btn").attr("disabled", false);
		$(".lodging_guest_opt>div>span").html("게스트 " + (parseInt(guest_no)+1) + "명");
		$(".lodging_guest_opt>div>span").attr("style", "color: black;");
	});
	
	$("#location-selectBox").on("change", function(){
		var si = $("#location-selectBox option:selected").val();
		if(si != ''){
			$("#location-selectBox-gu").show();
			getCity_gu(si);
		}else{
			$("#location-selectBox-gu").hide();
			$("#location-selectBox-gu option:selected").val('');
		}
		$("#search_location_input").val(si);
	});
	
	$("#location-selectBox-gu").on("change", function(){
		var si = $("#location-selectBox option:selected").val();
		var gu = $("#location-selectBox-gu option:selected").val();
		$("#search_location_input").val(si + "," + gu);
	});
});

function LodgingListForTheme(t_id){
	$.ajax({
        type: "GET",
        url: "/lodging",
        data: {"t_id": t_id},
        success: function(data){
			makeLodgingList(data);
        }
    });
}

function showUserBox(){
	$(".modal-wrap").addClass("modal-on");
	
	var display = $(".userBar-menu").css("display");
	
	if("block" == display){
		$(".userBar-menu").hide();
	}else{
		$(".userBar-menu").show();
	}
}

function getThemeNav(){
    $.ajax({
        type: "GET",
        url: "/theme",
        data: {},
        success: function(data){
            var str = "";
			data.forEach((i) => {
				str += `<button class="theme_btn" data-value="${i.T_ID}" type="button">
							<div>
								<span>
									<img class="nav_img" src="${i.T_ICON_ID}" width="24px" height="24px"/>
									<div>
										<span>${i.T_NAME}</span>
									</div>
								</span>
							</div>
						</button>`;
			})
			$("#theme_buttons").html(str);
        }
    });
}

function gotoHostPage(){
	location.href="host";
}

function searchForTheme(e){
	var t_id = $(e).data('value');
	$.ajax({
		type: "GET",
		url: "/theme/"+t_id,
		data: {},
		success: function(data){
			var str = "";
			for(var i in data){
				str += `<div class="picList_area" id="${data[i].l_id}" onclick="getLodgingDetailView(this.id)">
							<div class="pic_div">
								<img src="lodging/pic_url?url=${data[i].main_pic}" />
							</div>
							<div class="pic_title">${data[i].l_name}</div>
							<div class="pic_price">₩${priceToString(data[i].basic_price)} /박</div>
						</div>
						`;
			}
			
			$(".lodging_list_area").html(str);
		}
	});
}

function getAllLodging(){
	$.ajax({
		type: "GET",
		url: "/lodging",
		data: {},
		success: function(data){
			makeLodgingList(data);
		}
	});
}


function priceToString(price){
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function makeLodgingList(data){
	var str = "";
	if(data.length == 0){
		$(".lodging_list_area").addClass("none");
		str = `
			<div><span>검색 조건에 해당하는 숙소가 존재하지 않습니다.</span></div>
		`;
	}else{
		$(".lodging_list_area").removeClass("none");
		for(var i in data){
			str += `<div class="picList_area" id="${data[i].l_id}" onclick="getLodgingDetailView(this.id)">
						<div class="pic_div">
							<img src="lodging/pic_url?url=${data[i].main_pic}" />
						</div>
						<div class="pic_title">${data[i].l_name}</div>
						<div class="pic_price">₩${priceToString(data[i].basic_price)} /박</div>
					</div>
					`;
		}
	}
	$(".lodging_list_area").html(str);
}

function showDetailSearchBar(){
	chkModalOn();
	$($(".searchBar")[0]).fadeOut(300, function(){
		$(".modal-wrap-search").fadeIn(500);
		$(".modal-wrap-search").addClass("modal-on");
		
		$("#detail_search_lodging").slideDown(300, function(){
			$("#search-location").fadeIn(200);
			$(".lodging_location_opt").addClass("on");
		});
	});
}

function initSearchBar(isTrue){
	if(!isTrue){
		$(".modal-wrap-search").fadeOut(300);
		$(".modal-wrap-search").removeClass("modal-on");
		$("#detail_search_lodging").fadeOut(300, function(){
			$($(".searchBar")[0]).fadeIn(300);
		});
	}else{
		$(".modal-wrap-search").fadeOut(300);
		$(".modal-wrap-search").removeClass("modal-on");
		$('.search-option-div').css('display', 'none');
		$('.detail_searchBar>div').removeClass('on');
	}
}

function checkSearchBarValue(){
	var input_val = $("#search_location_input").val().replaceAll(",", " ");
	var city_si = $("#location-selectBox").val();
	var checkIn = $("#search_firstDay").val();
	var guest_no = $("div[name=search_guest_no]").html() > 0;
	
	var isTrue = input_val || city_si || checkIn || guest_no ;
	return isTrue;
}

function setSearchCalendar(){
	var re_obj = {
		inline: true, // 달력의 display
		format: 'YYYY/MM/DD', // 날짜 포맷
		container: '#search-calendar', // inline:true면 필수로 적어줘야함 달력 표출 영역
		alwaysOpen: true, // 항상 표출 여부 true - yes
		selectBackward: false, // true- 처음 선택한 날짜의 이전으로 선택 가능 / 불가능 
		selectForward: true, // true - 처음 선택한 날짜의 이후로 선택 가능 / 불가능
		startDate: new Date(), // 시작 날짜 new Date()면 오늘 날짜이므로 전날선택 불가능
		showShortcuts: false,
		showTopbar: false,
		swapTime: false,
		time: {
			enabled: false
		},
	}
	
	$("#search-calendar").dateRangePicker(re_obj)
	.bind('datepicker-first-date-selected', function(event, obj){
		var startDay = obj.date1.getFullYear() + ". " + (parseInt(obj.date1.getMonth())+1) + ". " + obj.date1.getDate() + ". ";
		$("#search_firstDay").val(startDay);
	})
	.bind('datepicker-change',function(event,obj){
		var finishDay = obj.date2.getFullYear() + ". " + (parseInt(obj.date2.getMonth())+1) + ". " + obj.date2.getDate() + ". ";
		$("#search_endDay").val(finishDay);
		
	});
}

function getCity_si(){
	$.ajax({
		type: "GET",
		url: "/city",
		data: {},
		success: function(data){
			var str = `<option value='' hidden>시 선택</option>
						<option value=''>전체 선택</option>`;
			for(var i in data){
				str += `
					<option value="${data[i]}">${data[i]}</option>
				`;
			}
			$("#location-selectBox").html(str);
		}
	});
}

function getCity_gu(si){
	$.ajax({
		type: "GET",
		url: "/city/si/" + si,
		data: {},
		success: function(data){
			var str = `<option value='' hidden>구 선택</option>
						<option value=''>전체 선택</option>`;
			for(var i in data){
				str += `
					<option value="${data[i]}">${data[i]}</option>
				`;
			}
			$("#location-selectBox-gu").html(str);
		}
	});
}

function inputSearchCity(search_val){
	$.ajax({
		type: "GET",
		url: "/city/str",
		data: {"str": search_val},
		success: function(data){
			var str = "";
			for(var i=0; i<5; i++){
				if(data[i] != null){
					str += `
						<div class="search_li" onclick="setInputCity(this)">
							<div class="search_li_icon">
								<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 22px; width: 22px; fill: currentcolor;">
									<path d="m15.9999.33325c6.4433664 0 11.6667 5.22332687 11.6667 11.66665 0 .395185-.0196984.7942624-.0585936 1.1970109-.3656031 3.7857147-2.3760434 7.7525726-5.487905 11.7201691-1.1932825 1.5214248-2.4696691 2.9382012-3.7464266 4.2149447l-.264609.2625401-.2565836.2505683-.4871024.4643445-.3377669.3126669-.2592315.2338445-.7684829.6644749-.6531219-.5633124-.7123549-.6476755-.4871002-.4643445c-.1682693-.1630063-.3422204-.3341398-.5211901-.5131084-1.2767516-1.2767436-2.5531323-2.69352-3.74640918-4.2149449-3.11184685-3.9675963-5.12227757-7.9344539-5.48787896-11.7201677-.03889501-.4027484-.05859326-.8018256-.05859326-1.1970105 0-6.44329813 5.22335863-11.66665 11.66665-11.66665zm0 2c-5.3387224 0-9.66665 4.32792195-9.66665 9.66665 0 .3301812.01653349.665142.04933146 1.004757.32161647 3.3302606 2.17313947 6.9835713 5.07084634 10.6781398.9771881 1.2459122 2.0157692 2.4217661 3.0628871 3.5026159l.5240256.5323924.4974749.4897834.4621846.4404115.2257179-.2133444.4810251-.4660964.252726-.2507558c1.2232503-1.2232369 2.4468714-2.5814442 3.5869296-4.0350084 2.8977203-3.6945683 4.7492518-7.3478787 5.0708697-10.6781384.0327981-.3396149.0493317-.6745755.0493317-1.0047566 0-5.33875305-4.3279026-9.66665-9.6667-9.66665zm.0001 4.66675c2.7614237 0 5 2.23857625 5 5 0 2.7614237-2.2385763 5-5 5s-5-2.2385763-5-5c0-2.76142375 2.2385763-5 5-5zm0 2c-1.6568542 0-3 1.3431458-3 3s1.3431458 3 3 3 3-1.3431458 3-3-1.3431458-3-3-3z">
									</path>
								</svg>
							</div>
							<div class="search_li_val">${data[i]}</div>
						</div>
					`;
				}
			}
			$("#input-search").html(str);
		}
	});
}

function setInputCity(e){
	var fullInput = $($(e).find(".search_li_val")).html();
	var si = fullInput.split(", ")[0];
	var gu = fullInput.split(", ")[1];
	
	$("#location-selectBox").val(si);
	$("#location-selectBox-gu").val(gu);
	$("#search_location_input").val(fullInput);	
}

function searchAll(){
	var input_val = $("#search_location_input").val().replaceAll(",", " ");
	var city_si = $("#location-selectBox").val();
	var city_gu = $("#location-selectBox-gu").val();
	var checkIn = $("#search_firstDay").val();
	var checkOut = $("#search_endDay").val();
	var guest_no = $("div[name=search_guest_no]").html();

	var index = 0;
	if(checkIn != ''){
		checkIn = checkIn.replaceAll(". ", "/");
		index = checkIn.lastIndexOf("/");
		checkIn = checkIn.substr(0, index);
	}
	if(checkOut != ''){
		checkOut = checkOut.replaceAll(". ", "/");
		index = checkOut.lastIndexOf("/");
		checkOut = checkOut.substr(0, index);
	}
	
	$.ajax({
		 type: "GET"
		,url: "/lodging"
		,data: {
			 "input_val": input_val
			,"city_si": city_si
			,"city_gu": city_gu
			,"checkIn": checkIn
			,"checkOut": checkOut
			,"guest_no": guest_no
		}
		,success: function(data){
			makeLodgingList(data);
			initSearchBar(checkSearchBarValue());
			$(".theme_btn").removeClass(".on");
		}
	});
}

function chkModalOn(){
	$(".modal-on").removeClass("modal-on");
}


