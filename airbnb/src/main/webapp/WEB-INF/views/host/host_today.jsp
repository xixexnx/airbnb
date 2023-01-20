<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false"%>
<c:set var="hostName" value="${pageContext.request.getSession(false)==null ? '' : pageContext.request.session.getAttribute('user_name')}"/>

<div class="title_msg f_t_2">${hostName }님, 안녕하세요!</div>

<div class="reservation">				
	<div class="f_t_3">예약</div>
	<div class="reservation_nav">
		<button type="button" onclick="addOn(this)">체크아웃 예정</button>
		<button type="button" onclick="addOn(this)">현재 호스팅 중</button>
		<button type="button" onclick="addOn(this)">체크인 예정</button>
	</div>
	<div class="reservation_table">
	
	</div>
</div>