var city_map = new Map();
var building_map = new Map();
var facility = new Array();
var theme = new Array();

var content_files = new Array();
var fileNum = 0;

const user = " ";

$(function() {
	getTheme();
	getStructure();
	getFacility();

	getTodayPage();
	getCheckOutList();

	//	getCalendar();
//	getLoadgingInfo(l_name);

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
		getCalendarPage();
	});

	$("#host_today").on("click", function() {
		getTodayPage();
	});
});

function gotoHosting() {
	location.href = "host/hosting";
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
						<input type="checkbox" class="hosting_item_chk" value="${i.T_ID}"/>
						<span>${i.T_NAME}</span>
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
									<img src="/image/theme/${i.S_ICON_URL}.jpg" width="25px"/>
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

	var filesArr = Array.prototype.slice.call(files);
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

			if (i == 0) {
				$(".pic_area.pic_main").html(str);
			} else {
				$($(".pic_small_div>div")[i - 1]).html(str);
			}
		};
		fr.readAsDataURL(f);
	});
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
			if ($($("#hosting_form>div")[parseInt(now_page_level) - 1]).find("video").length != 0) {
				$($("#hosting_form>div")[parseInt(now_page_level) - 1]).find("video")[0].play();
			}
			$("#hosting_next").show();
			if (now_page == 1) {
				$("#hosting_prev").hide();
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
			if ($($("#hosting_form>div")[parseInt(now_page_level) + 1]).find("video").length != 0) {
				$($("#hosting_form>div")[parseInt(now_page_level) + 1]).find("video")[0].play();
			}
			$("#hosting_prev").show();
		});

		if (now_page_level == $("#hosting_form>div").length - 2) {
			$(".preview_pic").html($(".pic_area.pic_main").html());
			$(".preview_title").html($("input[name=title]").val());
			$(".preview_price").html($("input[name=price]").val());

			$("#hosting_next").val("숙소 등록");
		}
	}
}

function chk_btn(e) {
	$(e).parent().parent().find("button").removeClass("on");
	$(e).addClass("on");
}

function chk_btn_multiple(e) {
	$(e).addClass("on");
}

function getTodayPage() {
	$.ajax({
		type: "GET",
		url: "host/today",
		contentType: false,
		success: function(data) {
			$("#host_content_div").html(data);
			if($("#host_content_div").hasClass("wideFit")){
				$("#host_content_div").removeClass("wideFit");
			}
		}
	});
}

function getCalendarPage() {
	$.ajax({
		type: "GET",
		url: "host/calendar",
		contentType: false,
		success: function(data) {
			$("#host_content_div").html(data);
			$("#host_content_div").addClass("wideFit");
		},
		complete: function(){
			getUserLodging();
		}	
	});
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
		url: "host/lodging/" + user,
		contentType: false,
		success: function(data) {
			$("#userLodgingList").html(data[0].l_name);
			getCalendar(data[0].basic_price, data[0].basic_price);	
		}
	});
}

function getLoadgingInfo(l_name){
	$.ajax({
		type: "GET",
		url: "host/loadging/" + l_name,
		contentType: false,
		success: function(data) {
			// 예약가능 여부랑 금액
//			$("#host_content_div").html(data);
//			$("#host_content_div").addClass("wideFit");
		}
	});	
} 

function getCalendar(basic_price, weekend_price) {
	var today = new Date();
	var date = new Date();

	var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	var calendar = $("#calendar");
	$("#calendar_yy").html(today.getFullYear());
	$("#calendar_mm").html(today.getMonth()+1);

	calendar.append(`<div role='grid' aria-label="${today.getFullYear() + " " + (today.getMonth())+1}" aria-colcount="7" aria-rowcount="6">`);
	
	var cellCnt = 1;
	var str = `<div role="rowgroup">`;
	var row = 1;
	for (var day = 1 - doMonth.getDay(); day <= lastDate.getDate(); day++) {
		if(day == 1-doMonth.getDay()){
			str += `<div role="row">`;
		}
		
		if(Math.sign(day) < 1 ){
			str += `<div class="calendar_cell none" role="gridcell" aria-rowindex="${row}" aria-colindex="${cellCnt}">
					</div>`;
		}
		else if (date.getDate() > day && Math.sign(day) == 1) {
			str += `<div class="calendar_cell prevDay" role="gridcell" aria-rowindex="${row}" aria-colindex="${cellCnt}">
						<button id="" class="calendar_cellBtn">
						<div>${day}</div>
						<div>₩${basic_price}</div>
						</button>
					</div>`;
		}
		else if (date.getDate() == day) {
			str += `<div class="calendar_cell today" role="gridcell" aria-rowindex="${row}" aria-colindex="${cellCnt}">
						<button id="" class="calendar_cellBtn">
						<div>${day} 오늘</div>
						<div>₩${basic_price}</div>
						</button>
					</div>`;
		}
		else if (Math.sign(day) == 1) {
			str += `<div class="calendar_cell nextDay" role="gridcell" aria-rowindex="${row}" aria-colindex="${cellCnt}">
						<button id="" class="calendar_cellBtn">
						<div>${day}</div>
						<div>₩${basic_price}</div>
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

}