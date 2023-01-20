<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
	<head>
	    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	    
<!-- 		<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script> -->
<!-- 		<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script> -->
<!-- 		<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script> -->
<!-- 		<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js"></script> -->
		
	    <script src="/js/main.js"></script>
	    <script src="/js/host.js"></script>
	    
	    <link rel="stylesheet" href="/css/main.css"/>
	    <link rel="stylesheet" href="/css/host.css"/>
	<link rel="icon" href="/image/logo.png">
	    
	   <title>호스트 알림판 - Airbnb</title>
	</head>
	<body>
		<div class="wrap">
		<div class="modal-wrap" style="display:none;"></div>
		<div class="header">
			<div class="logo-div">
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
	     					<div onclick="">예약</div>
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
		
		<div id="host_content_div">
		
		</div>
	</div>
</html>