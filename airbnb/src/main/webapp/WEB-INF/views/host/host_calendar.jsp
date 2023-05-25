<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="/js/host.js"></script>
    <script src="/js/main.js"></script>
<!--     <script src="/js/calendar.js"></script> -->
    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/host.css"/>
	<link rel="icon" href="/image/logo.png">
<title>달력수정하기 - 에어비앤비</title>
</head>
<body>
<script>
	getUserLodging();
</script>
	<div class="wrap">
		<div class="modal-wrap modal"></div>
		<div class="header">
			<div class="logo-div" onclick="location.href='/host'">
	        	<div class="logo-img">
	        		<img src="/image/logo.png"/>
<!-- 	        		<div class="logo-text">airbnb</div> -->
	        	</div>
	     		</div>
	     		
	     		<div class="host_nav">
	     			<div id="host_today" class="nav_btn">투데이</div>
	     			<div id="host_calendar" class="nav_btn">달력</div>
	     			<div id="host_nav_btn" class="nav_btn">
	     				<div style="display: flex; align-items: center;">
		     				메뉴
							<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; margin-left: 5px; fill: rgb(113, 113, 113); height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;" aria-hidden="true" role="presentation" focusable="false">
								<g fill="none">
									<path d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932">
									</path>
								</g>
							</svg>
						</div>
	     				<div id="host_nav_list" class="modal-content" style="display:none;">
	     					<div onclick="gotoLodging()">숙소</div>
	     					<div onclick="gotoReservationList()">예약</div>
	     					<div onclick="gotoHosting()">새로운 숙소 등록하기</div>
	     				</div>
	     			</div>
	     		</div>
	     		<div class="hostToUser">
	     			<div class="gotoUserPage f_t_5"><b>사용자 모드로 전환</b></div>
	     		</div>
	     		<div class="host_icon">
	     		
	     		</div>
		</div>
	</div>
	<div class="calendar_detail">
		<div id="detail_basic_div">
			<div class="f_t_4">달력 업데이트하기</div>
			<div class="">요금과 예약 가능 여부를 설정하려면 날짜를 선택하세요.</div>
		</div>
		<div id="detail_controll_div" style="display:none;">
			<div class="detail_date f_t_4" data-value=""></div>
			<div class="hosting_controll">
				<div>호스팅 가능</div>
				<div style="display: flex;">
					<div>
						<input type="radio" id="hosting_no" class="hosting_controll_input" name="hosting" value="false" />
						<label class="hosting_controll_btn" for="hosting_no">
							<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;">
								<path d="m6 6 20 20"></path>
								<path d="m26 6-20 20"></path>
							</svg>
						</label>
					</div>
					<div>
						<input type="radio" id="hosting_ok" class="hosting_controll_input" name="hosting" value="true" />
						<label class="hosting_controll_btn" for="hosting_ok">
							<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;">
								<path fill="none" d="m4 16.5 8 8 16-16"></path>
							</svg>
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="calendar_div">
		<div class="calendar_nav">
			<div class="calendar_nav_flex">
				<div>
			       	<span id="calendar_yy">YYYY</span>년
			       	<span id="calendar_mm">MM</span>월
				</div>
				<div>
					<button id="userLodgingBtn" data-value="" type="button" onclick="showUserLodging()"></button>		
					<div id="userLodgingList" style="display:none;">
						    
			       	</div>
				</div>
				<div>
					<span class="f_5">요금 설정 및 예약 가능일</span>
				</div>
			</div>
			<div class="calendar_week">
				<span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
			</div>
		</div>
		
		<div id="calendar">
		</div>
	</div>

</body>
</html>