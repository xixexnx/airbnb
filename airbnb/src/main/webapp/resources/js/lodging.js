$(function(){
	const today = new Date();
	const today_yy = today.getFullYear();
	const today_mm = today.getMonth()+1;
	const today_dd = today.getDate();
	
//	$('#datePicker_div').dateRangePicker({
	var div_obj = {
		inline: true, // 달력의 display
		format: 'YYYY/MM/DD', // 날짜 포맷
		container: '#datePicker_div', // inline:true면 필수로 적어줘야함 달력 표출 영역
		alwaysOpen: true, // 항상 표출 여부 true - yes
		selectBackward: false, // true- 처음 선택한 날짜의 이전으로 선택 가능 / 불가능 
		selectForward: true, // true - 처음 선택한 날짜의 이후로 선택 가능 / 불가능
		startDate: new Date(), // 시작 날짜 new Date()면 오늘 날짜이므로 전날선택 불가능
//		showTopbar: false, // 상단 날짜 입력 칸 표출 여부
	}
//	});
	
//	$("#reservation_date_info").dateRangePicker({
	var re_obj = {
//		inline: true, // 달력의 display
		format: 'YYYY/MM/DD', // 날짜 포맷
//		container: '#reservation_date_info', // inline:true면 필수로 적어줘야함 달력 표출 영역
//		alwaysOpen: true, // 항상 표출 여부 true - yes
		selectBackward: false, // true- 처음 선택한 날짜의 이전으로 선택 가능 / 불가능 
		selectForward: true, // true - 처음 선택한 날짜의 이후로 선택 가능 / 불가능
		startDate: new Date(), // 시작 날짜 new Date()면 오늘 날짜이므로 전날선택 불가능
	}
//	});
	
	$('#datePicker_div').dateRangePicker(div_obj)
	.bind('datepicker-first-date-selected', function(event, obj){
		var startDay = obj.date1.getFullYear() + "." + (parseInt(obj.date1.getMonth())+1) + "." + obj.date1.getDate();
		$("#checkIn_dd").html(startDay);
		
		$("#reservation_date_info").data('dateRangePicker')
		.setStart(startDay);
		console.log("div 첫번째 변경");
	})
	.bind('datepicker-change',function(event,obj){
		var finishDay = obj.date2.getFullYear() + "." + (parseInt(obj.date2.getMonth())+1) + "." + obj.date2.getDate();
		$("#checkOut_dd").html(finishDay);
		
		$("#reservation_date_info").data('dateRangePicker')
		.setEnd(finishDay, true);
	});
	
	$('#reservation_date_info').dateRangePicker(re_obj)
	.bind('datepicker-first-date-selected', function(event, obj){
		var startDay = obj.date1.getFullYear() + "." + (parseInt(obj.date1.getMonth())+1) + "." + obj.date1.getDate();
		$("#checkIn_dd").html(startDay);
		
		$("#datePicker_div").data('dateRangePicker')
		.setStart(startDay);
	})
	.bind('datepicker-change',function(event,obj){
		var finishDay = obj.date2.getFullYear() + "." + (parseInt(obj.date2.getMonth())+1) + "." + obj.date2.getDate();
		$("#checkOut_dd").html(finishDay);
		
		$("#datePicker_div").data('dateRangePicker')
		.setEnd(finishDay, true);
	});
	
});
