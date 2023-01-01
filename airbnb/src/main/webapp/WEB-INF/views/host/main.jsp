<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
	<head>
	    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	    <script src="/js/main.js"></script>
	    <script src="/js/host.js"></script>
	    
	    <link rel="stylesheet" href="/css/main.css"/>
	    <link rel="stylesheet" href="/css/host.css"/>
	    
	   <title>호스트 알림판 - Airbnb</title>
	</head>
	<body>
		<div class="wrap">
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
	     			<div class="nav_btn">
	     				메뉴
	     				<span>아이콘</span>
	     				<div>
	     					<div>숙소</div>
	     					<div>예약</div>
	     					<div>새로운 숙소 등록하기</div>
	     				</div>
	     			</div>
	     		</div>
	     		
	     		<div class="host_icon">
	     		
	     		</div>
		</div>
		
		<div id="host_content_div">
		
		</div>
	</div>
	<div class="hosting_content">
	  	<div class="hostingBar">
			<button onclick="gotoHosting()">숙소 등록</button>
		</div>
	</body>
</html>