<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<div class="calendar_detail">
	<div class="f_t_4">달력 업데이트하기</div>
	<div class="">요금과 예약 가능 여부를 설정하려면 날짜를 선택하세요.</div>
</div>
<div class="calendar_div">
	<div class="calendar_nav">
		<div class="calendar_nav_flex">
			<div>
		       	<span id="calendar_yy">YYYY</span>년
		       	<span id="calendar_mm">MM</span>월
			</div>
			<div>
				<button id="userLodgingList" type="button" onclick="addOn(this)"></button>		
			</div>
			<div>
				<span class="f_5">요금 설정 및 예약 가능일</span>
			</div>
		</div>
		<div class="calendar_week">
			<span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
		</div>
	</div>
<!-- 	<table class="calendar"> -->
<!-- 	    <tbody> -->
	    
<!-- 	    </tbody> -->
<!-- 	</table> -->
	<div id="calendar">
	</div>
</div>