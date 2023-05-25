var city_map = new Map();
var building_map = new Map();
var facility = new Array();
var theme = new Array();

var content_files = new Array();
var fileNum = 0;
var host_lodging_list = new Array();
var calendar_cnt = 0;

var scrollEvt = true;

$(function() {
	getTheme();	
	getStructure();
	getFacility();
	
	getTodayPage();
	
	$(document).on("click", function(e){
		if($(e.target)[0].id != "userLodgingBtn"){
			var list_display = $("#userLodgingList").css("display");
			if(list_display=="block"){
				$("#userLodgingList").hide();				
			}
		}
	});
	
	$("#host_pic_upload").on("change", function() {
		var files = $("#host_pic_upload")[0].files;
		readImage(files);
	});

	$(document).on("click", ".minus-btn", function(e) {
		var ex_no = $($(e.target).parent().find("div")[0]).html();
		
		if(ex_no == 0){
			return false;
		}else{
			$($(e.target).parent().find("div")[0]).html(ex_no - 1);
		}
		
		if (ex_no - 1 == 0) {
			$(e.target).attr("disabled", "disabled");
		}
		
		if($(e.target).hasClass("modifyGuest")){
			saveGuestInfo(ex_no - 1);
		}else if($(e.target).hasClass("modifyBed")){
			update_ld_bed(ex_no - 1);
		}else if($(e.target).hasClass("modifyBedroom")){
			update_ld_bedroom(ex_no - 1);
		}else if($(e.target).hasClass("modifyBath")){
			update_ld_bath(ex_no - 1);
		}
	});

	$(document).on("click", ".plus-btn", function(e) {
		var ex_no = $($(e.target).parent().find("div")[ 0]).html();
		$($(e.target).parent().find("div")[0]).html(parseInt(ex_no) + 1);

		$($(e.target).parent().find(".minus-btn")[0]).removeAttr("disabled");
	
		if($(e.target).hasClass("modifyGuest")){
			saveGuestInfo(parseInt(ex_no) + 1);
		}else if($(e.target).hasClass("modifyBed")){
			update_ld_bed(parseInt(ex_no) + 1);
		}else if($(e.target).hasClass("modifyBedroom")){
			update_ld_bedroom(parseInt(ex_no) + 1);
		}else if($(e.target).hasClass("modifyBath")){
			update_ld_bath(parseInt(ex_no) + 1);
		}
	});

	$("#host_calendar").on("click", function() {
		if(checkHostLodging()){
			getCalendarPage();
		}
	});

	$("#host_today").on("click", function() {
		gotoHost_today();
	});
	
	$("#host_nav_btn").on("click", function(){
		$(".modal-wrap").addClass("modal-on");
		var display = $("#host_nav_list").css("display");
		
		if(display == "block"){
			$("#host_nav_list").hide();
		}else{
			$("#host_nav_list").show();			
		}
	});
	
	$(".reservation_list_btn.host").on("click", function(e){
		$(".reservation_list_btn.host").removeClass("on");
		$(e.target).addClass("on");
		$('#table').bootstrapTable('refresh');
	});
	
	$(document).on("click", ".hosting_controll_btn", function(e){
		if($(e.currentTarget).hasClass("chk")){
		}else{
			updateHostingManage(e);
		}
	});
	
	$(window).scroll(function() {
		// 스크롤 80% 이상
		if(((window.scrollY + window.innerHeight) / $('body').prop("scrollHeight") * 100) > 80){
        	if(scrollEvt){
				scrollEvt = false;
	        }
		}
	});
	
	//hosting btn controll
	$(document).on("click", ".hosting_item_chk", function(){
		hosting_next_controll();
	});
	
	$(document).on("keyup", ".price_input", function(e){
		var pattern = /^[0-9]+$/;
		var inputNum = $(e.target).val();
		
		if(!pattern.test(inputNum)){
			$(e.target).val(inputNum.replace(/[^0-9]/g,""));
		}
	});
	
	$(document).on("keyup", ".input-data", function(){
		hosting_next_controll();
	});
	
	$(".gotoUserPage").on("click", function(){
		window.location.href = "/";
	});
	
	//hosting lodging table
	$(document).on("click", "#table tbody tr", function(e){
		var url = $(e.target).parent().attr("data-href");
		gotoHostLodgingPage(url);
	});
	
	// modify form
	$(document).on("keyup", ".modify_form input", function(e){
		var index = $(".modify_form input").index($(e.target));
		var txt = $($(".modify_form input")[index]).val();
		var ex_txt = $($(".modify_form input")[index]).attr("data-value");
		
		if(txt == ex_txt){
			$($(".modify_form input")[index]).parents(".ld_up_list").find(".apply_modify_btn").attr("disabled", "disabled");				
		}else{
			$($(".modify_form input")[index]).parents(".ld_up_list").find(".apply_modify_btn").attr("disabled", false);
		}
	});
	
	$(document).on("keyup", ".modify_form textarea", function(e){
		var index = $(".modify_form textarea").index($(e.target));
		var txt = $($(".modify_form textarea")[index]).val();
		var ex_txt = $($(".modify_form textarea")[index]).attr("data-value");
		
		if(txt == ex_txt){
			$($(".modify_form textarea")[index]).parents(".ld_up_list").find(".apply_modify_btn").attr("disabled", "disabled");				
		}else{
			$($(".modify_form textarea")[index]).parents(".ld_up_list").find(".apply_modify_btn").attr("disabled", false);
		}
	});
	
	$(document).on("change", "input[name=ld_state]", function(){
		var clickVal = $("input[name=ld_state]:checked").val();
		if($("#ld_state_modify_div").attr("data-value") == clickVal){
			$("#ld_state_apply_btn").attr("disabled", "disabled");
		}else{
			$("#ld_state_apply_btn").attr("disabled", false);
		}
	});
	
	$(document).on("click", ".ld_up_list .hosting_item_chk", function(e){
		$(e.target).parents(".ld_up_list").find(".apply_modify_btn").attr("disabled", false);		
	});
	
	$(document).on("click", ".ld_up_list .hosting_item_chk", function(e){
		$(e.target).parents(".ld_up_list").find(".apply_modify_btn").attr("disabled", false);				
	});
	
	$(document).on("click", "#privacy_modify_btn", function(){
		getModifyStructure();
	});
});

function gotoHosting() {
	location.href = "/host/hosting";
}

function getFacility() {
	$("#amenities_area").html(makeFacilityList());
}

function makeFacilityList(){
	var str = "";
	$.ajax({
		type: "GET",
		url: "/host/facility",
		data: {},
		async: false,
		success: function(data) {
			data.forEach((i) => {
				str += `<div class="hosting_item">
						<button type="button" class="hosting_item_chk" value="${i.F_ID}" onclick="chk_btn_multiple(this)">
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" viewBox="0 0 45 45">
								  <path d=" ${i.F_ICON_ID}"></path>
								</svg>
							</div>
							<div>
							${i.F_NAME}
							</div>
						</button>
					</div>`;
			});
		}
	});
	return str;
}

function getModifyFacility(){
	var l_id = $($(".lodging_name")[0]).attr("data-value");
	$.ajax({
		type: "GET",
		url: `/host/lodging/${l_id}/facility`,
		data: {},
		async: false,
		success: function(data) {
			var str = "";
			data.forEach((i) => {
				str += `<div class="hosting_item">
						<button type="button" class="hosting_item_chk`
						if(i.STATE == 'TRUE'){
							str += ' on';
						}
				str += `" value="${i.F_ID}" onclick="chk_btn_multiple(this)">
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" viewBox="0 0 45 45">
								  <path d=" ${i.F_ICON_ID}"></path>
								</svg>
							</div>
							<div>
							${i.F_NAME}
							</div>
						</button>
					</div>`;
			});
			$("#facility_modify_list").html(str);
		},
		complete: function(){
			$(".modal-wrap").addClass("modal-on");
			$("#facility_modify_div").show();
		}
	});
}

function getTheme() {
	$.ajax({
		type: "GET",
		url: "/host/theme",
		data: {},
		success: function(data) {
			var str = "";
			data.forEach((i) => {
				str += `<div class="hosting_item">
							<button type="button" class="hosting_item_chk" value="${i.T_ID}" onclick="chk_btn_multiple(this)">
								<div>
									<img src="${i.T_ICON_ID}" style="width:24px; height:24px;"/>
								</div>
								<div>
									${i.T_NAME}
								</div>
							</button>
					</div>`;
			});
			$("#theme_area").html(str);
		}
	});
}

function makeStructureList(){
	var str = "";
	$.ajax({
		type: "GET",
		url: "/host/structure",
		data: {},
		async: false,
		success: function(data) {
			data.forEach((i) => {
				str += `<div class="hosting_item">
							<button type="button" class="hosting_item_chk" value="${i.S_ID}" onclick="chk_btn(this)">
								<div>
									<img src="${i.S_ICON_URL}" width="25px"/>
								</div>
								<div>${i.S_NAME}</div>
							</button>
						</div>`;
			});
		}
	});
	return str;
}

function getStructure() {
	$("#structure_area").html(makeStructureList());
}

function getModifyStructure(){
	var str = "";
	$.ajax({
		type: "GET",
		url: "/host/structure",
		data: {},
		async: false,
		success: function(data) {
			data.forEach((i) => {
				str += `<div class="hosting_item">
							<button type="button" class="hosting_item_chk`
				if($("#ld_sid").attr("data-value") == i.S_ID){
				str += " on";
				}
				str +=	`" value="${i.S_ID}" onclick="chk_btn(this)">
								<div>
									<img src="${i.S_ICON_URL}" width="25px"/>
								</div>
								<div>
								${i.S_NAME}
								</div>
							</button>
						</div>`;
			});
		},
		complete: function(){
			$("#host_privacy_type_area").html(str);
		}
	});
}

async function readImage(event) {
	var filesArr = Array.prototype.slice.call(event);
	var str = "";

	for(var i in filesArr){
		var fr = new FileReader();
		fr.readAsDataURL(filesArr[i]);
		fr.onload =  async function(e) {
			await onloadFile(e);
		};
		content_files.push(filesArr[i]);		
	}
	hosting_next_controll();
}

async function onloadFile(img){
		var str = `<div class="pic_area pic_small">
						<img src='${img.target.result}' multiple='multiple'/>
					</div>
		`;
	    $(".pic_small_div").append(str);
}

function picDelete(fileNum) {
	content_files[fileNum].is_delete = true;
	$("#file" + fileNum).parent().remove();

	if (content_files.length == 0) {
		$("#host_pic_upload").val("");
	}
}

function hosting() {
	var formData = new FormData($("#hosting_form")[0]);
	for (var i = 0; i < content_files.length; i++) {
		if (!content_files[i].is_delete) {
			formData.append("picture", content_files[i]);
		}
	}

	formData.append("pictures", content_files);

	var structure = $("#structure_area button.on").val();
	formData.append("structure", structure);

	var privacy_type = $("#privacy_type_area button.on").val();
	formData.append("privacy_type", privacy_type);

	var location = $("input[name=place_road]").val() + " " + $("input[name=place_detail]").val();
	formData.append("host_loaction", location);

	var guest_no = $("div[name=guest_no]").html();
	formData.append("guest_no", guest_no);

	var bedroom_no = $("div[name=bedroom_no]").html();
	formData.append("bedroom_no", bedroom_no);

	var bed_no = $("div[name=bed_no]").html();
	formData.append("bed_no", bed_no);

	var bath_no = $("div[name=bath_no]").html();
	formData.append("bath_no", bath_no);

	var amenities = [];
	for (var i = 0; i < $("#amenities_area").find(".on").length; i++) {
		amenities.push($($("#amenities_area").find(".on")[i]).val());
	}
	formData.append("facility", amenities);


	var theme = [];
	for (var i = 0; i < $("#theme_area").find(".on").length; i++) {
		theme.push($($("#theme_area").find(".on")[i]).val());
	}
	formData.append("theme", theme);
	
	$.ajax({
		type: "POST",
		url: "/host/hosting",
		contentType: false,
		processData: false,
		data: formData,
		success: function(data) {
			if(data == "session Exception"){
				alert("세션이 만료되었습니다. 메인화면으로 이동합니다.");
				window.location.replace("/");
			}
			if (data == "success") {
				window.location.replace("/host");
			}
		}
	});
}

function hosting_prev() {
	var now_page_level = $("#hosting_form>div.on")[0].getAttribute("data-level");
	var now_page = $($("#hosting_form>div.on")[0]);
	now_page.removeClass("on");

	if (now_page_level > 0) {
		now_page.fadeOut(800, function() {
			$($("#hosting_form>div")[parseInt(now_page_level) - 1]).fadeIn(300);
			$($("#hosting_form>div")[parseInt(now_page_level) - 1]).addClass("on");
			hosting_next_controll();			
			
			if ($($("#hosting_form>div")[parseInt(now_page_level) - 1]).find("video").length != 0) {
				$($("#hosting_form>div")[parseInt(now_page_level) - 1]).find("video")[0].play();
			}
			$("#hosting_next").show();
			if (now_page == 1) {
				$("#hosting_prev").hide();
			}
			if (now_page_level != $("#hosting_form>div").length - 2) {
				$("#hosting_next").val("다음");
			}
		});
	}
}

function hosting_next() {
	var now_page_level = $("#hosting_form>div.on")[0].getAttribute("data-level");
	var now_page = $($("#hosting_form>div.on")[0]);

	if (!(now_page_level == $("#hosting_form>div").length - 1)) now_page.removeClass("on");

	if (now_page_level == $("#hosting_form>div").length - 1) {
		hosting();
	} else if (now_page_level < $("#hosting_form>div").length - 1) {
		now_page.fadeOut(800, function() {
			$($("#hosting_form>div")[parseInt(now_page_level) + 1]).fadeIn(300);
			$($("#hosting_form>div")[parseInt(now_page_level) + 1]).addClass("on");
			hosting_next_controll();
			
			if ($($("#hosting_form>div")[parseInt(now_page_level) + 1]).find("video").length != 0) {
				$($("#hosting_form>div")[parseInt(now_page_level) + 1]).find("video")[0].play();
			}
			$("#hosting_prev").show();

			if(now_page_level == 2){
				window.setTimeout(function() {
			    	map.relayout();
				}, 0);
			}
		});

		if (now_page_level == $("#hosting_form>div").length - 2) {
			$(".preview_pic").html($($(".pic_area.pic_small")[0]).html());
			$(".preview_title").html(formatString($("input[name=title]").val()));
			$(".preview_price").html("₩" + priceToString($("input[name=price]").val()) + " /박");
			$("#hosting_next").val("숙소 등록");
		}
	}
}

function chk_btn(e) {
	$(e).parent().parent().find("button").removeClass("on");
	$(e).addClass("on");
}

function chk_btn_multiple(e) {
	if($(e).hasClass("on")){
		$(e).removeClass("on");
	}else{
		$(e).addClass("on");
	}
}

function getTodayPage() {
	$.ajax({
		type: "GET",
		url: "/host/today",
		contentType: false,
		success: function(data) {
			$("#host_content_div").html(data);
			if($("#host_content_div").hasClass("wideFit")){
				$("#host_content_div").removeClass("wideFit");
			}
		}
	});
}

function checkHostLodging(){
	var isTrue = false;
	$.ajax({
		type: "GET",
		url: "/host/lodging",
		data: {},
		async: false, 
		contentType: false,
		success: function(data) {
			if(data.length > 0){
				isTrue = true;
			}else{
				alert('숙소 등록 후 이용해주세요.');
				isTrue = false;
			}
		},
	});	
	return isTrue;
}

function getCalendarPage() {
	window.location.href="/host/calendar";
}

function addOn(e) {
	$(".reservation_nav>button").removeClass("on");
	$(e).addClass("on");
}

function getUserLodging(){
	$.ajax({
		type: "GET",
		url: "/host/lodging",
		data: {},
		contentType: false,
		success: function(data) {
			host_lodging_list = data;
			makeLoadgingList(data[0].l_id);

			$("#userLodgingBtn").html(data[0].l_name);
			$("#userLodgingBtn").attr("data-value", data[0].l_id);
			
			getLoadgingInfo(data[0].l_id);
		}
	});
}

function getLoadgingInfo(l_id){
	$.ajax({
		type: "GET",
		url: "/host/lodging/" + l_id,
		contentType: false,
		data: {},
		success: function(data) {
			$("#calendar").html("");
			$("#userLodgingList").hide();
			$("#userLodgingBtn").html(data.l_name);
			$("#userLodgingBtn").attr("data-value", data.l_id);
			
			makeLoadgingList(data.l_id);
			getCalendar(data.basic_price, data.basic_price);
		}
	});	
} 

function makeLoadgingList(l_id){
	var lodgingStr = "";
	for(var i=0; i<host_lodging_list.length; i++){
		if(host_lodging_list[i].l_id != l_id){
			lodgingStr += `<div class="lodging_li" onclick="getLoadgingInfo('${host_lodging_list[i].l_id}')">${host_lodging_list[i].l_name}</div>`;
		}
	}
	$("#userLodgingList").html(lodgingStr);
}

function getCalendar(basic_price, weekend_price) {
	var today = new Date();
	var today = new Date(today.getFullYear(), (today.getMonth() + calendar_cnt), 1);
	
	var date = new Date();
	
	var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	
	var calendar = $("#calendar").hide();
	$("#calendar_yy").html(today.getFullYear());
	$("#calendar_mm").html(today.getMonth()+1);

	calendar.append(`<div role='grid' aria-label="${today.getFullYear() + " " + (today.getMonth()).toString().padStart(2, "0")}" aria-colcount="7" aria-rowcount="6">`);

	var cellCnt = 1;
	var str = `<div role="rowgroup">`;
	var row = 1;
	for (var day = 1 - doMonth.getDay(); day <= lastDate.getDate(); day++) {
		var fullDate = today.getFullYear()+""+(doMonth.getMonth()+1).toString().padStart(2, "0")+""+day.toString().padStart(2, "0");
		
		if(day == 1-doMonth.getDay()){
			str += `<div role="row">`;
		}
		
		if(Math.sign(day) < 1 ){
			str += `<div class="calendar_cell none" role="gridcell" aria-rowindex="${row}" aria-colindex="${cellCnt}" onclick="updateCalendar(this)">
					</div>`;
		}
		else if (calendar_cnt == 0 && date.getDate() > day && Math.sign(day) == 1) {
			str += `<div data-day="${fullDate}" class="calendar_cell prevDay" role="gridcell" aria-rowindex="${row}" aria-colindex="${cellCnt}">
						<button id="" class="calendar_cellBtn">
						<div>${day}</div>
						<div>₩${priceToString(basic_price)}</div>
						</button>
					</div>`;
		}
		else if (calendar_cnt == 0 && date.getDate() == day) {
			str += `<div data-day="${fullDate}" class="calendar_cell today" role="gridcell" aria-rowindex="${row}" aria-colindex="${cellCnt}" onclick="updateCalendar(this)">
						<button id="" class="calendar_cellBtn">
						<div>${day} 오늘</div>
						<div>₩${priceToString(basic_price)}</div>
						</button>
					</div>`;
		}
		else if (calendar_cnt > 0 || Math.sign(day) == 1) {
			str += `<div data-day="${fullDate}" class="calendar_cell nextDay" role="gridcell" aria-rowindex="${row}" aria-colindex="${cellCnt}" onclick="updateCalendar(this)">
						<button id="" class="calendar_cellBtn">
						<div>${day}</div>
						<div>₩${priceToString(basic_price)}</div>
						</button>
					</div>`;
		}

		if(cellCnt == 7) {
			if(day == lastDate.getDate()){
				str += '</div></div>';
			}else{
				str += `</div>
						<div role="row">`;
			}		
			cellCnt = 1;
			row++;
        }else{	
			cellCnt++;
		}
		
	}
	calendar.append(str);
	getReservation_host();
	getImpossible_date();
}

function getReservation_host(){
	var l_id = $("#userLodgingBtn").attr("data-value");
	var re = [];
	$.ajax({
		type: "GET",
		url: "/reservation/"+l_id,
		data: {},
		success: function(data){
			for(var i in data){
				re.push(data[i].r_date.replaceAll("-",""));
			}
		},
		complete: function(){
			disabled_reservation_date(re);
		}
	});
}

function disabled_reservation_date(d_date_list){
	var fullDate;
	for(var i in d_date_list){
		fullDate = d_date_list[i];
		
		$(`div[data-day='${fullDate}']`).addClass("disabled_date");
	}
	$("#calendar").show();
	$("#userLodgingList").hide();
}

function getImpossible_date(){
	var l_id = $("#userLodgingBtn").attr("data-value");
	$.ajax({
		type: "GET",
		url: "/host/hosting-manage/"+l_id,
		data: {},
		success: function(data){
			for(var i in data){
				$(`div[data-day='${data[i]}']`).addClass("impossible");
				$($(`div[data-day='${data[i]}']>button>div`)[1]).hide();
			}
		}
	});
}


function showUserLodging(){
	if($("#userLodgingList>div").length > 0){
		$("#userLodgingList").show();
	}
}

function updateCalendar(e){
	var sel_date = $(e).attr("data-day");
	var mm = parseInt(sel_date.substr(4,2));
	var dd = parseInt(sel_date.substr(6,2));
	var ds = numToStr($(e).attr("aria-colindex"));
	
	$(".detail_date").html(`${mm}월 ${dd}일 (${ds})`);
	$(".detail_date").attr("data-value", paddingDate(mm.toString()) + "/" + paddingDate(dd.toString()));
	
	getHostingManage(mm, dd);
	
	$("#detail_basic_div").hide();
	$("#detail_controll_div").show();
}

function numToStr(num){
	if(num==1){
		return "일";
	}else if(num==2){
		return "월";
	}else if(num==3){
		return "화";
	}else if(num==4){
		return "수";
	}else if(num==5){
		return "목";
	}else if(num==6){
		return "금";
	}else{
		return "토";
	}
}

function paddingDate(date){
	if(date.length < 2){
		date = date.padStart(2, "0");
	}
	return date;
}

function getHostingManage(mm, dd){
	var yy = $("#calendar_yy").html();
	var date = yy + "/" + mm + "/" + dd;
	
	$.ajax({
		type: "GET",
		url: "/host/hosting-manage",
		data: {
			"l_id": $("#userLodgingBtn").attr("data-value"),
			"l_date": date
		},
		success: function(data){
			changeHostingManage(data);
		}
	});
	
}

function updateHostingManage(e){
	// 필요한 것 : 날짜, 바뀐 상태
	var chkInput = $(e.currentTarget).attr("for");
	changeHostingManage($(`#${chkInput}`).val());
		
	var yy = $("#calendar_yy").html();
	var date = yy + "/" + $(".detail_date").attr("data-value");
	
	var type = "POST";
	var url = "/host/hosting-manage";
	var data = {
			"l_id": $("#userLodgingBtn").attr("data-value"),
			"l_date": date
	};
	
	if($(`#${chkInput}`).val() == "true"){
		type = "DELETE";
		url = url + `?l_id=${$("#userLodgingBtn").attr("data-value")}&l_date=${date}`;
		data = null;
	}
	
	$.ajax({
		type: type,
		url: url,
		data: data,
		success: function(data){
			if(type=="POST"){
				$(`div[data-day=${date.replaceAll("/", "")}]`).addClass("impossible");
				$($(`div[data-day='${date.replaceAll("/", "")}']>button>div`)[1]).hide();
			}else{
				$(`div[data-day=${date.replaceAll("/", "")}]`).removeClass("impossible");
				$($(`div[data-day='${date.replaceAll("/", "")}']>button>div`)[1]).show();
			}
		}
	});
}

function changeHostingManage(data){
	if(data == "true"){
		$("label[for=hosting_no]").removeClass("chk");	
		$("label[for=hosting_ok]").addClass("chk");
		$("#hosting_ok").prop("checked", true);
	}else{
		$("label[for=hosting_ok]").removeClass("chk");
		$("label[for=hosting_no]").addClass("chk");	
		$("#hosting_no").prop("checked", true);
	}
}

function gotoLodging(){
	if(checkHostLodging()){
		window.location.href="/host/list";
	}
}

function gotoHost_today(){
	window.location.href="/host";
}

function initTable1(){
	$.ajax({
		url: "/host/lodging",
		type: "GET",
		data: {},
		success: function(data){
			var str = "";
			for(var i in data){
				str += `
				<tr>
					<td data-field="">
						<input type="checkbox" value="${data[i].l_id}" data-checkbox="true"/>
					</td>
					<td data-field="l_name" data-sortable="true">
						<a href="/host/lodging/${data[i].l_id}">${data[i].l_name}</a>
					</td>
					<td data-field="bedroom_ea" data-sortable="true">
						${data[i].bedroom_ea}
					</td>
					<td data-field="bed_ea" data-sortable="true">
						${data[i].bed_ea}
					</td>
					<td data-field="bath_ea" data-sortable="true">
						${data[i].bath_ea}
					</td>
					<td data-field="l_addr1" data-sortable="true">
						${data[i].l_addr1}
					</td>
				</tr>
				`;
			}
			str += "";
			$("#table tbody").html(str);
		},
		complete: function(){
			$("#table").show();
		}
	});
}

function hosting_next_controll(){
	var input = $("#hosting_form").find(".on").find(".input-data");
	var item = $("#hosting_form").find(".on").find(".hosting_item_chk");
	
	var picChk = false;
	var inputChk = false;
	var itemChk = false;
	
	if(input.length > 0){
		for(var i=0; i<input.length; i++){
			if($(input[i]).val().replaceAll(" ", "").length == 0){
				inputChk = false;
				break;
			}
			if(i == input.length -1){
				inputChk = true;
			}
		}
	}else{
		inputChk = true;
	}
	
	if(item.length > 1){
		if($("#hosting_form").find(".on").find(".hosting_item_chk.on").length > 0){
			itemChk = true;
		}else{
			itemChk = false;
		}
	}else{
		itemChk = true;
	}
	
	if($("#hosting_form").find(".on").find(".drop_box").length > 0){
		if(content_files.length >= 5){
			picChk = true;
		}else{
			picChk = false;
		}
	}else{
		picChk = true;	
	}

	if(inputChk && itemChk && picChk){
		$("#hosting_next").attr("disabled", false);
		$("#hosting_next").css("background", "black");
		$("#hosting_next").css("cursor", "pointer");
	}else{
		$("#hosting_next").attr("disabled", "disabled");
		$("#hosting_next").css("background", "#ccc");
		$("#hosting_next").css("cursor", "not-allowed");
	}
}

function priceToString(price){
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function gotoHostLodgingPage(url){
	location.href = url;
}

function openLi(e){
	var index = $(".detail_li").index(e);
	$(".detail_li").removeClass("open");
	$(".detail_sub_li").removeClass("on");
	$($(".detail_li")[index]).addClass("open");

	$($(".detail_li.open .detail_sub_li")[0]).addClass("on");
	
	changeDetailView($($(".detail_li")[index]).attr("data-url"));
}

/* host lodging detail view func */
function changeDetailView(url){
	var l_id = $($(".lodging_name")[0]).attr("data-value");
	$.ajax({
		 type: 'GET'
		,url: "/host/detailView/" + l_id + "/" + url
		,data: {}
		,success: function(data){
			$("#lodgiong_update_content").html(data);
		}
	});
}

function openSearchDiv(){
	$(".modal-wrap").addClass("modal-on");
	$(".search_option").show();
}

function openStateOpt(){
	$(".modal-wrap").addClass("modal-on");
	$(".search_state_option").show();
}

function searchOptApply(){
	searchTable();
}

function searchTable(){
	var data = {};
	var state = [];
	
	if($("#search_bedroom_ea").html() > 0){
		data.bedroom_ea = $("#search_bedroom_ea").html();
	}
	if($("#search_bed_ea").html() > 0){
		data.bed_ea = $("#search_bed_ea").html();
	}
	if($("#search_bath_ea").html() > 0){
		data.bath_ea = $("#search_bath_ea").html();
	}
	if($(".search_state_option input[name='ld_state']:checked").length > 0){
		for(var i=0; i<$(".search_state_option input[name='ld_state']:checked").length; i++){
			state.push($($(".search_state_option input[name='ld_state']:checked")[i]).val());
		}
		data.l_state = state;
	}

  	$("#table").bootstrapTable('refreshOptions', 'and');

 	$("#table").bootstrapTable('filterBy', data);
}

function close_modify_btn(e){
	var index = $(".close_modify_btn").index(e);
	var parentDiv = $(e).parents(".ld_up_list");
	parentDiv.removeClass("open");
	parentDiv.find("input").attr("readonly", true);
	parentDiv.find(".forView").show();
	parentDiv.find(".forModify").hide();
	parentDiv.find("input").val(parentDiv.find("input").attr("data-value"));
//	$($(".modify_form input")[index]).val($($(".modify_form input")[index]).attr("data-value"));
}

function close_modify(e){
	var index = $(".close_modify").index(e);
	var parentDiv = $(e).parents(".ld_up_list");
	parentDiv.removeClass("open");
	parentDiv.find("input").attr("readonly", true);
	parentDiv.find(".forView").show();
	parentDiv.find(".forModify").hide();
	parentDiv.find("input").val(parentDiv.find("input").attr("data-value"));
}

function apply_modify(form_id){
	$(`#${form_id}`).removeClass("open");
	$(`#${form_id} input`).attr("readonly", true);
	$(`#${form_id} .forView`).show();
	$(`#${form_id} .forModify`).hide();
}

function openModifyForm(e){
	var index = $(".detail_up_btn").index(e);
	var div = $($(".detail_up_btn")[index]).parents(".ld_up_list");
	div.addClass("open");	
	div.find("input").attr("readonly", false);
	div.find("textarea").attr("readonly", false);
	div.find(".forView").hide();
	div.find(".forModify").show();
}

function resize(obj){
 	obj.style.height = "1px";
  	obj.style.height = (12+obj.scrollHeight)+"px";
	
}

function update_ld_title(){
	var l_id = $(".lodging_name").attr("data-value");
	$.ajax({
		 type: 'PATCH'
		,url: `/host/lodging/${l_id}/title`
		,contentType: "application/json; charset=utf-8"
        ,processData:false
		,dataType: "json"
		,data: JSON.stringify({
			"l_name": $("input[name=ld_title]").val() 
		})
		,success: function(data){
			if(data == 1){
				$("input[name=ld_title]").attr("data-value", $("input[name=ld_title]").val());
				$(".lodging_name span").html(formatString($("input[name=ld_title]").val()));
				apply_modify("ld_title_form");
			}else{
				alert("저장에 실패했습니다.");
				window.location.reload();
			}
		}
	});
}

function update_ld_exp(){
	var l_id = $(".lodging_name").attr("data-value");
	$.ajax({
		 type: 'PATCH'
		,url: `/host/lodging/${l_id}/exp`
		,contentType: "application/json; charset=utf-8"
        ,processData:false
		,dataType: "json"
		,data: JSON.stringify({
			"l_exp":  $("textarea.detail_val").val()
		})
		,success: function(data){
			if(data == 1){
				apply_modify("ld_exp_form");
			}else{
				alert("저장에 실패했습니다.");
				window.location.reload();
			}
		}
	});
}

function saveGuestInfo(no){
	var l_id = $(".lodging_name").attr("data-value");
	$.ajax({
		 method: 'PATCH'
		,url: `/host/lodging/${l_id}/guest`
        ,contentType: "application/json; charset=utf-8"
        ,processData:false
		,dataType: "json"
		,data: JSON.stringify({
			"basic_person": no
		})
		,success: function(data){
			if(data == 1){
				alert("적용 완료되었습니다.");
			}else{
				alert("저장에 실패했습니다.");
				window.location.reload();
			}
		}
	});
}

function update_ld_state(){
	var state = $("input[name=ld_state]:checked").val();
	quarterState(state);
}

function quarterState(state){
	var l_id = $(".lodging_name").attr("data-value");
	if(state == "ON"){
		type = "DELETE"
	}else{
		type = "POST";
	}
	$.ajax({
		 type: type
		,url: `/host/lodging/${l_id}/state`
		,data: {
			"state": state
		}
		,success: function(data){
			window.location.reload();
		}
	});	
}



function update_ld_addr(){
	var l_id = $(".lodging_name").attr("data-value");
	$.ajax({
		 type: 'PATCH'
		,url: `/host/lodging/${l_id}/addr`
		,contentType: "application/json; charset=utf-8"
        ,processData:false
		,dataType: "json"
		,data: JSON.stringify({
			"l_addr": $("input[name=ld_addr]").val() 
		})
		,success: function(data){
			if(data == 1){
				$("input[name=ld_addr]").attr("data-value", $("input[name=ld_addr]").val());
				$(".lodging_name span").html(formatString($("input[name=ld_addr]").val()));
				apply_modify("ld_addr_form");
			}else{
				alert("저장에 실패했습니다.");
				window.location.reload();s
			}
		}
	});
}

function close_facility_btn(){
	$(".modal-on").removeClass("modal-on");
	$("#facility_modify_div").hide();
}

function update_ld_facility(){
	var l_id = $(".lodging_name").attr("data-value");
	var facility_list_dom = $("#facility_modify_list .hosting_item_chk.on");
	var facility_list = [];
	for(var i=0; i<facility_list_dom.length; i++){
		facility_list.push(facility_list_dom[i].value);
	}

	$.ajax({
		 type: 'PATCH'
		,url: `/host/lodging/${l_id}/facility`
		,contentType: "application/json; charset=utf-8"
        ,processData:false
		,dataType: "json"
		,data: JSON.stringify({
			"facility_list_string": facility_list
		})
		,success: function(data){
			if(data == 1){
				close_facility_btn();
			}else{
				alert("저장에 실패했습니다.");
			}
		}
	});
}

function update_ld_privacy(){
	var l_id = $(".lodging_name").attr("data-value");
	var s_id = $("#host_privacy_type_area .hosting_item_chk.on").val();
	
	$.ajax({
		 type: 'PATCH'
		,url: `/host/lodging/${l_id}/sid`
		,contentType: "application/json; charset=utf-8"
        ,processData:false
		,dataType: "json"
		,data: JSON.stringify({
			"building_code": s_id
		})
		,success: function(data){
			if(data == 1){
				$("#ld_sid").html($($("#host_privacy_type_area .hosting_item_chk.on div")[1]).html());
				$("#ld_sid").attr("data-value", $("#host_privacy_type_area .hosting_item_chk.on").val());
				apply_modify("ld_privacy_form");
			}else{
				alert("저장에 실패했습니다.");
			}
		}
	});
}
function update_ld_bbb(data){
	var l_id = $(".lodging_name").attr("data-value");
	$.ajax({
		 type: 'PATCH'
		,url: `/host/lodging/${l_id}/bbb`
		,contentType: "application/json; charset=utf-8"
        ,processData:false
		,dataType: "json"
		,data: JSON.stringify(data)
		,success: function(data){
			if(data == 1){
				alert("저장에 성공했습니다.");
			}else{
				alert("저장에 실패했습니다.");
			}
		}
	});
}

function update_ld_bed(no){
	var data = {
		 "bed_ea": no
		,"bedroom_ea": $("#ld_bedroom_ea").html()
		,"bath_ea": $("#ld_bath_ea").html()
	}
	update_ld_bbb(data);
}

function update_ld_bedroom(no){
	var data = {
		 "bed_ea": $("#ld_bed_ea").html()
		,"bedroom_ea":no
		,"bath_ea": $("#ld_bath_ea").html()
	}
	update_ld_bbb(data);
}

function update_ld_bath(no){
	var data = {
		 "bed_ea": $("#ld_bed_ea").html()
		,"bedroom_ea": $("#ld_bedroom_ea").html()
		,"bath_ea": no
	}
	update_ld_bbb(data);
}

function update_ld_price(){
	var l_id = $(".lodging_name").attr("data-value");
	var price = $("#ld_basic_price").val();
	$.ajax({
		 type: 'PATCH'
		,url: `/host/lodging/${l_id}/price`
		,contentType: "application/json; charset=utf-8"
        ,processData:false
		,dataType: "json"
		,data: JSON.stringify({
			"basic_price": price
		})
		,success: function(data){
			if(data == 1){
				apply_modify("ld_price_form");
			}else{
				alert("저장에 실패했습니다.");
			}
		}
	});
}

function gotoReservationList(){
	if(checkHostLodging()){
		location.href = "/host/reservation";		
	}
}

function formatDate(date){
	return date.split(' ')[0];
}