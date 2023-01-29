var s_day = null;
var e_day = null;
var disabled_day = null;

$(function(){
	getImpossibleDateList();
	
	$(window).scroll(function() {
		var picker_display = $("body>.date-picker-wrapper");
		if(picker_display.css("display") == "block"){
			picker_display.hide();
		}
	});
});


function getTotalPrice(date1, date2){
	var diffDate = date2.getTime() - date1.getTime();
	var lodging_date = Math.ceil(diffDate / (60*1000*60*24));
	var total_price = $('.once_price>span').html().replace("₩", "").replace(",","") * lodging_date;
	$(".total_price").html("₩"+ priceToString(total_price));
}

function priceToString(price){
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function gotoReservation(){
	var l_id = $("#lodging_info").data("value");
	var person = $("#gest_no").data("value");
	var r_date_list = getDateArray(s_day, e_day);
	
	if(s_day == null){
		alert("숙박 시작 일자를 선택하세요.");	
		return false;
	}else if(e_day == null){
		alert("숙박 종료 일자를 선택하세요.");	
		return false;
	}else{
		$.ajax({
			type: "POST",
			url: "/reservation",
			data: {"l_id": l_id, "person": person, "r_date_list": r_date_list},
			success: function(data){
				location.reload();
			}
		});
	}
}

function getDateArray(startDate, endDate){
	var start = new Date(startDate);
	var end = new Date(endDate);
	
	var arr = new Array();
	var curDate = start;

	while(curDate <= end){
		var fullDay = curDate.getFullYear() + "-" + (curDate.getMonth()+1) + "-" + curDate.getDate();
		arr.push(fullDay);
		curDate.setDate(curDate.getDate()+1);
	}
	return arr;
}

function getImpossibleDateList(){
	var l_id = $("#lodging_info").data("value");
	$.ajax({
		type: "GET",
		url: `/lodging/reservation/${l_id}`,
		data: {},
		success: function(data){
			disabled_day = data;
			console.log(data);
		}
		,complete: function(){
			setDatePicker();
		}
	});
}


function setDatePicker(){
	var div_obj = {
			inline: true, // 달력의 display
			format: 'YYYY/MM/DD', // 날짜 포맷
			container: '#datePicker_div', // inline:true면 필수로 적어줘야함 달력 표출 영역
			alwaysOpen: true, // 항상 표출 여부 true - yes
			selectBackward: false, // true- 처음 선택한 날짜의 이전으로 선택 가능 / 불가능 
			selectForward: true, // true - 처음 선택한 날짜의 이후로 선택 가능 / 불가능
			startDate: new Date(), // 시작 날짜 new Date()면 오늘 날짜이므로 전날선택 불가능
	//		showTopbar: false, // 상단 날짜 입력 칸 표출 여부
			showShortcuts: false,
			showTopbar: false,
			swapTime: false,
			time: {
				enabled: false
			},
			beforeShowDay: function(date1)
			{
				var valid = true;
				var d_day;
				for(var i in disabled_day){
					d_day = new Date(disabled_day[i]);
					if((date1.getFullYear() === d_day.getFullYear() && date1.getMonth() === d_day.getMonth() && date1.getDate() === d_day.getDate())){
						valid = false;
						break;
					}
				}
	       		return [valid];
			}
		}
		
		var re_obj = {
	//		inline: true, // 달력의 display
			format: 'YYYY/MM/DD', // 날짜 포맷
	//		container: '#reservation_date_info', // inline:true면 필수로 적어줘야함 달력 표출 영역
	//		alwaysOpen: true, // 항상 표출 여부 true - yes
			selectBackward: false, // true- 처음 선택한 날짜의 이전으로 선택 가능 / 불가능 
			selectForward: true, // true - 처음 선택한 날짜의 이후로 선택 가능 / 불가능
			startDate: new Date(), // 시작 날짜 new Date()면 오늘 날짜이므로 전날선택 불가능
			showShortcuts: false,
			showTopbar: false,
			swapTime: false,
			time: {
				enabled: false
			},
			beforeShowDay: function(date1)
			{
				var valid = true;
				var d_day;
				for(var i in disabled_day){
					d_day = new Date(disabled_day[i]);
					if((date1.getFullYear() === d_day.getFullYear() && date1.getMonth() === d_day.getMonth() && date1.getDate() === d_day.getDate())){
						valid = false;
						break;
					}
				}
	       		return [valid];
			}
		}
		
		$('#datePicker_div').dateRangePicker(div_obj)
		.bind('datepicker-first-date-selected', function(event, obj){
			var startDay = obj.date1.getFullYear() + "." + (parseInt(obj.date1.getMonth())+1) + "." + obj.date1.getDate();
			$("#checkIn_dd").html(startDay);
			
			$("#reservation_date_info").data('dateRangePicker')
			.setStart(startDay);
		})
		.bind('datepicker-change',function(event,obj){
			var finishDay = obj.date2.getFullYear() + "." + (parseInt(obj.date2.getMonth())+1) + "." + obj.date2.getDate();
			$("#checkOut_dd").html(finishDay);
			
			$("#reservation_date_info").data('dateRangePicker')
			.setEnd(finishDay, true);
			
			getTotalPrice(obj.date1, obj.date2);
			s_day = obj.date1;
			e_day = obj.date2;
		});
		
		$('#reservation_date_info').dateRangePicker(re_obj)
		.bind('datepicker-first-date-selected', function(event, obj){
			var startDay = obj.date1.getFullYear() + ". " + (parseInt(obj.date1.getMonth())+1) + ". " + obj.date1.getDate() + ". ";
			$("#checkIn_dd").html(startDay);
			
			$("#datePicker_div").data('dateRangePicker')
			.setStart(startDay);
		})
		.bind('datepicker-change',function(event,obj){
			var finishDay = obj.date2.getFullYear() + ". " + (parseInt(obj.date2.getMonth())+1) + ". " + obj.date2.getDate() + ". ";
			$("#checkOut_dd").html(finishDay);
			
			$("#datePicker_div").data('dateRangePicker')
			.setEnd(finishDay, true);
			
			getTotalPrice(obj.date1, obj.date2);
			s_day = obj.date1;
			e_day = obj.date2;
		});
}