<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false"%>
<c:set var="hostName" value="${pageContext.request.getSession(false)==null ? '' : pageContext.request.session.getAttribute('user_name')}"/>

<div class="title_msg f_t_2">${hostName }님, 안녕하세요!</div>

<div class="reservation">				
	<!-- <div class="f_t_3">예약</div> -->
	<div class="reservation_nav">
		<!-- <button type="button" onclick="addOn(this)">체크아웃 예정</button> -->
		<!-- <button type="button" onclick="addOn(this)">현재 호스팅 중</button> -->
		<!-- <button type="button" onclick="addOn(this)">체크인 예정</button> -->
	</div>
	<div class="reservation_table">
		<div>
			달력으로 이동하면 이번 달의 숙소 운영 여부를 일 단위로 제어할 수 있습니다.
		</div>
		<div>
			메뉴 - 숙소로 이동하면 숙소 정보를 관리할 수 있습니다.
		</div>
		<div>
			메뉴 - 예약으로 이동하면 숙소별 예약된 리스트를 확인할 수 있습니다.
		</div>
		<div>
		메뉴 - 새로운 숙소 등록하기로 이동하면 새로운 숙소를 등록할 수 있습니다.
		</div>
	</div>
</div>