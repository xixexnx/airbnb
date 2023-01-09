<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>  
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!-- 	<script src="/js/jquery-ui.js"></script> -->
    <script src="/js/lodging.js"></script>
    
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.16.0/moment.min.js"></script>
<!-- 	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script> -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-date-range-picker/0.14.2/jquery.daterangepicker.min.js"></script>

    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-date-range-picker/0.14.2/daterangepicker.min.css">
<!-- 	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" /> -->

    <link rel="stylesheet" href="/css/jquery-ui.css"/>
<meta charset="UTF-8">
<title>${vo.l_name}</title>

</head>
<body>
	<div class="wrap">
	    <div class="header">
	      <div class="logo-div">
	        <div class="logo-img">
	        	<img src="/image/logo.png"/>
	        	<div class="logo-text">airbnb</div>
	        </div>
	      </div>
	      </div>
	      
	      <div class="content">
	      	<div class="f_t_2">${vo.l_name }</div>
	      	<div class="lodging_list_area2">
	      		<div class="pic_div2 big">
	      			<img src="pic_url?url=${vo.pic_path_list[0] }"/>
	      		</div>
	      		<div class="pic_div2">
	      			<img src="pic_url?url=${vo.pic_path_list[1] }"/>
	      		</div>
	      		<div class="pic_div2">
	      			<img src="pic_url?url=${vo.pic_path_list[2] }"/>
	      		</div>
	      		<div class="pic_div2">
	      			<img src="pic_url?url=${vo.pic_path_list[3] }"/>
	      		</div>
	      		<div class="pic_div2">
	      			<img src="pic_url?url=${vo.pic_path_list[4] }"/>
	      		</div>
	      	</div>
	      	
	      	<div class="">
	      		<div class="content_div">
				  	<div class="detail_div">
				  		<div class="title_info">
					      	<div class="f_t_4">
					      		${vo.userVo.user_name }님이 호스팅하는 ${vo.building_code }
					      	</div>
					      	<div class="f_5">
					      		최대 인원 ${vo.basic_person }명 · 침실 ${vo.bedroom_ea }개 · 침대 ${vo.bed_ea }개 · 욕실 ${vo.bath_ea }개
					      	</div>
					    </div>
					    <div class="exp_info">
					    	${vo.l_exp }
					    </div>
					    <div class="facility_info">
					    	<div class="f_t_4">숙소 편의시설</div>
					    	<div class="facility_info_list">
					    		<c:forEach var="name" items="${vo.facility_list}">
					    			<c:out value= "${name}" />
					    		</c:forEach>
					    	</div>
					    </div>
					    <div id="datePicker_div">
					    
					    </div>
			      	</div>
			      	<div class="scroll_div">
			      		<div class="once_price">₩${vo.basic_price } /박</div>
				      		<div id="reservation_date_info">
				      			<div>
				      				<div>체크인</div>
				      				<div id="checkIn_dd"></div>
				      			</div>
				      			<div>
				      				<div>체크아웃</div>
				      				<div id="checkOut_dd"></div>
				      			</div>
				      		</div>
				      		<div id="reservation_per_info">
				      			<div>일반</div>
				      			<div>게스트 1명</div>
				      		</div>
			      		<button type="button" class="reservation_btn" onclick="gotoReservation()">예약하기</button>
			      		<div>예약 확정 전에는 요금이 청구되지 않습니다.</div>
			      		
			      		<div class="bill_list">
			      			<div class="date"></div>
			      			<div class="total_price_div">
			      			<div>총 합계</div><div class="total_price"></div>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
		      	<div>
		      		<div class="host_info">
				    	<div>호스트: ${vo.userVo.user_name }님</div>
				    	<div>${vo.userVo.user_name }님은 호스트 레벨 ${vo.userVo.user_lvl }입니다.</div>
<!-- 				    	<button type="button" onclick="connect_host">호스트에게 연락하기</button> -->
				    </div>
				    <div class="rule_info">
				    	<div class="f_t_4">알아두어야할 사항</div>
				    	<div class="">
				    		<div>숙소 이용규칙</div>
				    		<div>체크인 가능 시간: ${vo.checkin } 이후</div>
				    		<div>체크아웃 시간: ${vo.checkout } 전까지</div>
				    	</div>
				    </div>
		      	</div>
	      	</div>
	      </div>
      </div>
</body>

</html>
