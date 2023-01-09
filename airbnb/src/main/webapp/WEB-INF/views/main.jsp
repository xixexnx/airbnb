<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="/js/main.js"></script>
    <link rel="stylesheet" href="/css/main.css"/>
    <title>여행은 살아보는 거야 - 에어비앤비</title>
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
        <div class="search-div">
          <div class="searchBar">
            <button class="search-btn"><b>어디든지</b></button>
            <span></span>
            <button class="search-btn middle-btn"><b>언제든 일주일</b></button>
            <span></span>
            <button class="search-btn">게스트 추가</button>
            <div class="search-icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
				  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
				</svg>
            </div>
          </div>
        </div>
        <div class="hostingBar">
        	<div class="gotoHostPage"><b>당신의 공간을 에어비앤비하세요.</b></div>
        </div>
        <div class="userBar">
       		<button class="search-btn" onclick="showUserBox()"> 사용자 아이콘 </button>
	        <div class="userBar-menu" style="display:none;">
	       		<div class="joinBtn">회원가입</div>
	       		<div class="loginBtn">로그인</div>
	       	</div>
        </div>
    </div>
    
    <div class="theme_area">
	    <button id="slideLeft" class="slideButton">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
			  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
			</svg>
		</button>
    	<div id="theme_buttons"></div>
	    <button id="slideRight" class="slideButton">
	    	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
			  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
			</svg>
	    </button>
	    <div id="theme_custom">
	   		<button class="theme_filter">
		   		<span>
		   		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
				  <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
				</svg>
				</span>	
		   		<span>필터</span>
	   		</button>
	   	</div>	   	
    </div>
    
    <div class="lodging_list_area">
    </div>
  </div>

  <div class="modal_login modal">
    <jsp:include page="login.jsp"/>
  </div>
  <div class="modal_register modal">
    <jsp:include page="user/register.jsp"/>
  </div>
  </body>
</html>
