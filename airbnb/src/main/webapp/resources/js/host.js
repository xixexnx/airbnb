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
	getCheckOutList();
	
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

	$("#imgUpload").on("change", function() {
		var files = $("#imgUpload")[0].files;
		readImage(files);
	});

	$(".drop_box").on("dragover", function(e) {
		e.preventDefault();
	});

	$(".drop_box").on("drop", function(e) {
		e.preventDefault();
		var files = e.originalEvent.dataTransfer.files;
		readImage(files);
	});

	$(".minus-btn").on("click", function(e) {
		var ex_no = $($(e.target).parent().find("div")[0]).html();
		$($(e.target).parent().find("div")[0]).html(ex_no - 1);
		if (ex_no - 1 == 0) {
			$(e.target).attr("disabled", "disabled");
		}
	});

	$(".plus-btn").on("click", function(e) {
		var ex_no = $($(e.target).parent().find("div")[0]).html();
		$($(e.target).parent().find("div")[0]).html(parseInt(ex_no) + 1);

		$($(e.target).parent().find(".minus-btn")[0]).removeAttr("disabled");
	});

	$("#host_calendar").on("click", function() {
		if(chkCalendarList()){
			getCalendarPage();
		}else{
			alert("숙소 등록 후 이용해주세요.");
		}
	});

	$("#host_today").on("click", function() {
		gotoHost_today();
	});
	
	$("#host_nav_btn").on("click", function(){
		$(".modal-wrap").show();
		var display = $("#host_nav_list").css("display");
		
		if(display == "block"){
			$("#host_nav_list").hide();
		}else{
			$("#host_nav_list").show();			
		}
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
//				getCalendar('60000', '60000'); 
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
});

function gotoHosting() {
	location.href = "/host/hosting";
}

function getFacility() {
	$.ajax({
		type: "GET",
		url: "facility",
		data: {},
		success: function(data) {
			var str = "";
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
			$("#amenities_area").html(str);
		}
	});
}

function getTheme() {
	$.ajax({
		type: "GET",
		url: "theme",
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

function getStructure() {
	$.ajax({
		type: "GET",
		url: "structure",
		data: {},
		success: function(data) {
			var str = "";
			data.forEach((i) => {
				str += `<div class="hosting_item">
							<button type="button" class="hosting_item_chk" value="${i.S_ID}" onclick="chk_btn(this)">
								<div>
									<img src="${i.S_ICON_URL}" width="25px"/>
								</div>
								<div>
								${i.S_NAME}
								</div>
							</button>
						</div>`;
			});
			$("#structure_area").html(str);
		}
	});
}

function readImage(files) {
	$(".before_sel_pic").hide();
	$(".after_sel_pic").show();

//	var filesArr = Array.prototype.slice.call(files);
	var filesArr = Array.prototype.slice.call(files);
//	var content_files
	var str = "";

	filesArr.forEach(function(f, i, a) {
		var fr = new FileReader();
		fr.onload = function(e) {
			content_files.push(f);
			if (i > 2) {
				$(".pic_small_div").append(`<div class="pic_area pic_small"></div>`);
			}
			str = `<img src='${e.target.result}' multiple='multiple'/>
					 <div class='pic_control' id='file${fileNum}' onclick='picDelete(${fileNum})'>
					 </div>`;

			if (content_files.length + i == 1) {
				$(".pic_area.pic_main").html(str);
			} else {
				$($(".pic_small_div>div")[content_files.length - i - 2]).html(str);
			}
		};
		fr.readAsDataURL(f);
	});
	hosting_next_controll();
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
		url: "hosting",
		contentType: false,
		processData: false,
		data: formData,
		success: function(data) {
			if (data == "success") {
				window.location.replace("/host");
			}
		}
	});
}

function hosting_prev() {
	var now_page_level = $("#hosting_form>div.on")[0].getAttribute("data-level");
	var now_page = $($("#hosting_form>div.on")[0]);
	//	now_page.hide();
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

	now_page.removeClass("on");

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
		});

		if (now_page_level == $("#hosting_form>div").length - 2) {
			$(".preview_pic").html($(".pic_area.pic_main").html());
			$(".preview_title").html($("input[name=title]").val());
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

function chkCalendarList(){
	var re = false;
	$.ajax({
		type: "GET",
		url: "/host/lodging",
		data: {},
		async: false, 
		contentType: false,
		success: function(data) {
			if(data.length > 0){
				re = true;
			}
		},
	});	
	return re;
}

function getCalendarPage() {
	window.location.href="/host/calendar";
	
//	$.ajax({
//		type: "GET",
//		url: "/host/calendar",
//		contentType: false,
//		success: function(data) {
//			$("#host_content_div").html(data);
//			$("#host_content_div").addClass("wideFit");
//		},
//		complete: function(){
//			getUserLodging();
//		}	
//	});
}

function addOn(e) {
	$(".reservation_nav>button").removeClass("on");
	$(e).addClass("on");
}


function getCheckOutList() {

}

function getHostingList() {

}

function getCheckInList() {

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
//	if(calendar_cnt > 0){
//		today = new Date(today.getFullYear(), (today.getMonth() + calendar_cnt), 1);
//	}
	var today = new Date(today.getFullYear(), (today.getMonth() + calendar_cnt), 1);
	
	var date = new Date();
	
	var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	
	var calendar = $("#calendar").hide();
	$("#calendar_yy").html(today.getFullYear());
	$("#calendar_mm").html(today.getMonth()+1);

	calendar.append(`<div role='grid' aria-label="${today.getFullYear() + " " + (today.getMonth()).toString().padStart(2, "0")}" aria-colcount="7" aria-rowcount="6">`);
//	var str2 = "";
//	if(calendar_cnt > 0){
//		str2 += `<section class="calendar_month_label" data-value="${today.getFullYear()} ${today.getMonth()+1}">
//					<div class="abcd">${today.getFullYear()}년 ${today.getMonth()+1}월</div>
//				</section>
//		`;	
//	calendar.append(str2);
//	}
	
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
//	calendar_cnt++;
	calendar.append(str);
	getReservation_host();
	getImpossible_date();
	
//	scrollEvt = true;
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
	$("#userLodgingList").show();
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
	window.location.href="/host/list";
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
		if(content_files.length >= 4){
			picChk = true;
		}else{
			picChk = false;
		}
	}else{
		picChk = true;	
	}
	console.log(inputChk + "/" + itemChk +"/" + picChk );
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