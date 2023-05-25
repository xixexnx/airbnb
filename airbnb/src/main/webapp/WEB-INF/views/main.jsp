<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false"%>

<c:set var="loginId" value="${pageContext.request.getSession(false) == null ? '' : pageContext.request.session.getAttribute('user_id')}"/>
<% 
	String msg = request.getParameter("msgCode"); 
	String returnUrl = request.getParameter("returnUrl");
%>
<html>
  <head>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.16.0/moment.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-date-range-picker/0.14.2/jquery.daterangepicker.min.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/common.js"></script>
    
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-date-range-picker/0.14.2/daterangepicker.min.css">
    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/calendar.css"/>
	<link rel="icon" href="/image/logo.png">
    <title>여행은 살아보는 거야 - 에어비앤비</title>
  </head>
  <body>

  <div class="wrap">
  <div class="modal-wrap modal"></div> 
  <div class="modal-wrap-search modal"></div>
    <div class="header">
      <div class="logo-div">
        <div class="logo-img" onclick="location.href='/'">
        	<img src="/image/logo.png"/>
        	<div class="logo-text">airbnb</div>
        </div>
      </div>
        <div class="search-div">
          <div class="searchBar" onclick="showDetailSearchBar()">
            <button class="search-btn"><b>어디든지</b></button>
            <span></span>
            <button class="search-btn middle-btn"><b>언제든 일주일</b></button>
            <span></span>
            <button class="search-btn">게스트 추가</button>
            <div class="search-icon">
				<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;">
					<g fill="none">
						<path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9">
						</path>
					</g>
				</svg>
            </div>            
          </div>
          <form id="detail_search_lodging" style="display:none;">
          	<div class="detail_searchBar">
          		<div class="lodging_location_opt">
            		<label class="f_t_6">여행지</label>
            		<div><input id="search_location_input" type="text" class="s_f_6" placeholder="여행지 검색" /></div>
            		<div id="search-location" class="search-option-div" style="display: none;">
	          			<div id="select-search">
		          			<div class="f_t_6">지역으로 검색하기</div>
		          			<select id="location-selectBox">
		          			
		          			</select>
		          			<select id="location-selectBox-gu" style="display: none;">
		          			
		          			</select>
	          			</div>
	          			<div id="input-search">
	          			
	          			</div>
	          		</div>
            	</div>
            	<div class="lodging_calendar_opt">
            		<div class="checkIn_opt">
	            		<label class="f_t_6">체크인</label>
	            		<div>
	            			<input type="text" id="search_firstDay" placeholder="날짜 추가" class="s_f_6" disabled />
	            		<!-- <span id="search_firstDay" class="s_f_6">날짜 추가</span> -->
	            		</div>
            		</div>
            		<div class="checkOut_opt">
	            		<label class="f_t_6">체크아웃</label>
	            		<div>
	            			<input type="text" id="search_endDay" placeholder="날짜 추가" class="s_f_6" disabled />
	            		<!-- <span id="search_endDay" class="s_f_6">날짜 추가</span> -->
	            		</div>
            		</div>
            		<div id="search-calendar" class="search-option-div" style="display: none;">
            			
            		</div>
            	</div>
            	<div class="lodging_guest_opt ">
            		<label class="f_t_6">여행자</label>
            		<div><span class="s_f_6">게스트 추가</span></div>
            		<div id="search-guest" class="search-option-div" style="display: none;">
            			<div>
            				<div class="f_t_5" style="margin-right: 10px;">성인</div>
            			</div>
            			<div class="p_m_btn">
							<button type="button" class="minus-btn" disabled="disabled">-</button>
							<div name="search_guest_no">0</div>
							<button type="button" class="plus-btn">+</button>
						</div>
            		</div>
            	</div>
            	<div class="detail_search_btn" style="padding: 5px;">
            		<button id="lodgingSearchBtn" type="button" onclick="searchAll()">검색</button>
            	</div>
          	</div>
          </form>
        </div>
        <div class="hostingBar">
         	<c:choose>
		        <c:when test="${loginId != '' && loginId != null}">
		        	<div class="gotoHostPage f_t_5"><b>호스트 모드로 전환</b></div>
		        </c:when>
		        <c:otherwise>
		        </c:otherwise>
		    </c:choose>
        </div>
        <div class="userBar">
       		<button class="search-btn" onclick="showUserBox()">
       			<div>
            		<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 3; overflow: visible;">
	            		<g fill="none" fill-rule="nonzero">
		            		<path d="m2 16h28"></path>
		            		<path d="m2 24h28"></path>
		            		<path d="m2 8h28"></path>
            			</g>
            		</svg>
            	</div>
            	<div class="user-icon">
            		<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 100%; width: 100%; fill: currentcolor;">
	            		<path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z">
	            		</path>
            		</svg>	
            	</div>
       		</button>
	        <div class="userBar-menu modal-content" style="display:none;">
		         <c:choose>
			        <c:when test="${loginId != '' && loginId != null}">
			            <div onclick="location.href='/reservation'">예약 관리</div>
			            <div onclick="location.href='/logout'">로그아웃</div>
			        </c:when>
			        <c:otherwise>
			       		<div class="joinBtn">회원가입</div>
			       		<div class="loginBtn">로그인</div>
			        </c:otherwise>
			    </c:choose>
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
<!-- 	    <div id="theme_custom"> -->
<!-- 	   		<button class="theme_filter"> -->
<!-- 		   		<span> -->
<!-- 		   		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16"> -->
<!-- 				  <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/> -->
<!-- 				</svg> -->
<!-- 				</span>	 -->
<!-- 		   		<span>필터</span> -->
<!-- 	   		</button> -->
<!-- 	   	</div>	   	 -->
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
  
  <script>
  	setSearchCalendar();
  	getCity_si();
  	
  	$(function(){
  		var responseMessage = "<c:out value="<%= msg%>" />";
  		if(responseMessage != ''){  			
	  		alert(responseMessage);
	  		window.location.href= "/";
  		}
  	});
  </script>
  </body>
</html>
