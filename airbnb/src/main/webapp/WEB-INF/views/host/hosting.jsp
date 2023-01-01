<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!--     <script src="/js/main.js"></script> -->
    <script src="/js/host.js"></script>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=359ec773fec5083976d50f2d2df57b3f&libraries=services"></script>
    
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/host.css"/>
  
    <title>호스팅 시작하기 - Airbnb</title>
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
	    
		<div class="host_content">
		<form id="hosting_form">
			<div data-level="0" id="hosting1" class="on hosting_col2" style="display:flex;">
				<jsp:include page="/WEB-INF/views/host/include/about-your-place.jsp"/>
			</div>
			<div data-level="1" id="hosting2" class="hosting_col1" style="display:none;">
				<jsp:include page="/WEB-INF/views/host/include/structure.jsp"/>
			</div>
			<div data-level="2" style="display:none;" class="hosting_col1" >
				<jsp:include page="/WEB-INF/views/host/include/privacy-type.jsp"/>
			</div>
			<div data-level="3" style="display:none;" class="hosting_col1_wide" >
				<jsp:include page="/WEB-INF/views/host/include/location.jsp"/>
			</div>
			<div data-level="4" style="display:none;" class="hosting_col1" >
				<jsp:include page="/WEB-INF/views/host/include/floor-plan.jsp"/>
			</div>
			<div data-level="5" style="display:none;" class="hosting_col2">
				<jsp:include page="/WEB-INF/views/host/include/stand-out.jsp"/>
			</div>
			<div data-level="6" style="display:none;" class="hosting_col1" >
				<jsp:include page="/WEB-INF/views/host/include/amenities.jsp"/>
			</div>
			<div data-level="7" style="display:none;" class="hosting_col1" >
				<jsp:include page="/WEB-INF/views/host/include/photos.jsp"/>
			</div>
			<div data-level="8" style="display:none;" class="hosting_col1" >
				<jsp:include page="/WEB-INF/views/host/include/title.jsp"/>
			</div>
			<div data-level="9" style="display:none;" class="hosting_col1" >
				<jsp:include page="/WEB-INF/views/host/include/description.jsp"/>
			</div>
			<div data-level="10" style="display:none;" class="hosting_col2">
				<jsp:include page="/WEB-INF/views/host/include/finish-setup.jsp"/>
			</div>
			<div data-level="11" style="display:none;" class="hosting_col1" >
				<jsp:include page="/WEB-INF/views/host/include/price.jsp"/>
			</div>
			<div data-level="12" style="display:none;" class="hosting_col1_wide" >
				<jsp:include page="/WEB-INF/views/host/include/receipt.jsp"/>
			</div>
		</form>
		</div>
		<div class="hosting_control">
			<input id="hosting_prev" type="button" value="뒤로" onclick="hosting_prev()" style="display:none"/>
			<input id="hosting_next" type="button" value="다음" onclick="hosting_next()"/>
		</div>
	</div>
  </body>
</html>