<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/host.js"></script>
    <script src="/js/main.js"></script>

    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/host.css"/>
    
	<title>'<c:out value= "${vo.l_name }" escapeXml="false" />' 숙소 수정하기 - 에어비앤비</title>	
	<link rel="icon" href="/image/logo.png">
</head>
<body>	
	<div class="wrap">
	<div class="modal-wrap modal"></div>
		<div class="header">
			<div class="logo-div" onclick="location.href='/host'">
	        	<div class="logo-img">
	        		<img src="/image/logo.png"/>
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
		<div class="host_wide_content">
		<div class="title">
			<div class="lodging_name" data-value="<c:out value='${vo.l_id }'/>">
				<span class="f_t_2"><c:out value= '${vo.l_name}' escapeXml="false" /></span>
			</div>
			<div class="lodging_onoff">
				<c:if test = "${vo.l_state eq 'ON'}"> 
				<button	class="state_btn" onclick="quarterState('OFF')" data-value='off'>
					<svg viewBox="0 0 16 16" role="img" aria-hidden="false" aria-label="운영 중지" focusable="false" style="height: 10px; width: 10px; fill: rgb(193, 53, 21);">
						<ellipse cx="8" cy="8" fill-rule="evenodd" rx="8" ry="8">
						</ellipse>
					</svg>
					<span>운영 중지</span>
				</button>
				</c:if>
				
				<c:if test = "${vo.l_state eq 'OFF'}"> 
				<button	class="state_btn" onclick="quarterState('ON')" data-value='on'>
					<svg viewBox="0 0 16 16" role="img" aria-hidden="true" aria-label="운영 중" focusable="false" style="height: 10px; width: 10px; fill: green;">
						<ellipse cx="8" cy="8" fill-rule="evenodd" rx="8" ry="8">
						</ellipse>
					</svg>
					<span>운영 시작</span>
				</button>
				</c:if>
			</div>
		</div>
		<div id="lodging_detail_content">
			<div id="leftSideBar" class="">
				<ul>
					<li class="detail_li open" onclick="openLi(this)" data-url="info">
						<a>숙소 세부정보</a>
						<ol>
							<!-- <li class="detail_sub_li on">사진</li> -->
							<li class="detail_sub_li on">숙소 기본 정보</li>
							<li class="detail_sub_li">편의시설</li>
							<li class="detail_sub_li">위치</li>
							<li class="detail_sub_li">숙소 및 객실</li>
<!-- 							<li class="detail_sub_li">접근성</li> -->
<!-- 							<li class="detail_sub_li">게스트 안전</li> -->
						</ol>
					</li>
					<li class="detail_li" onclick="openLi(this)" data-url="priceDay">
						<a>요금 및 예약 가능일 조정</a>
						<ol>
							<li class="detail_sub_li">요금</li>
<!-- 							<li class="detail_sub_li">할인</li> -->
<!-- 							<li class="detail_sub_li">추가 요금</li> -->
<!-- 							<li class="detail_sub_li">세금</li> -->
<!-- 							<li class="detail_sub_li">여행 기간</li> -->
<!-- 							<li class="detail_sub_li">달력 예약 가능 여부</li> -->
<!-- 							<li class="detail_sub_li">달력 동기화</li> -->
<!-- 							<li class="detail_sub_li">공유 설정</li> -->
						</ol>
					</li>
<!-- 					<li class="detail_li" onclick="openLi(this)" data-url=""> -->
<!-- 						<a>정책 및 규칙</a> -->
<!-- 						<ol> -->
<!-- 							<li class="detail_sub_li">정책</li> -->
<!-- 							<li class="detail_sub_li">숙소 이용규칙</li> -->
<!-- 							<li class="detail_sub_li">게스트 필수조건</li> -->
<!-- 						</ol> -->
<!-- 					</li> -->
<!-- 					<li class="detail_li" onclick="openLi(this)" data-url="forGuest"> -->
<!-- 						<a>게스트를 위한 정보</a> -->
<!-- 						<ol> -->
<!-- 							<li class="detail_sub_li">예약 전 정보</li> -->
<!-- 							<li class="detail_sub_li">예약 후 정보</li> -->
<!-- 							<li class="detail_sub_li">도착 상세 정보</li> -->
<!-- 						</ol> -->
<!-- 					</li> -->
				</ul>
			</div>
			<div id="lodgiong_update_content">
				
			</div>
		</div>
		</div>
	</div>
	
	<script>
		$(function(){changeDetailView('info');});
	</script>
</body>
</html>