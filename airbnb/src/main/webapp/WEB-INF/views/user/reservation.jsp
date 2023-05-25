<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false"%>

<html>
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
   		<script src="/js/common.js"></script>
   		<script src="/js/user.js"></script>
   		<link rel="stylesheet" href="/css/table.css"/>
   		<link rel="stylesheet" href="/css/main.css"/>
		<link rel="icon" href="/image/logo.png">
		<title>예약 - 에어비앤비</title>
	</head>	
	<body>
		<div class="wrap">
		 	<div class="modal-wrap" style="display: none;"></div> 
		 	<div class="modal-wrap-search" style="display: none;"></div>
	    	<div class="header">
	     	 	<div class="logo-div">
		        	<div class="logo-img" onclick="location.href='/'">
			        	<img src="/image/logo.png"/>
			        	<div class="logo-text">airbnb</div>
			        </div>
   			 	</div>
   			 </div>
   			
   			<div class="content">
   				<div class="fl_space">
   					<div class="f_t_2">예정된 여행</div>
	   				<button id="reservation_cancel_btn" class="reservation_list_btn_cancel" onclick="cancel_reservation()" type="button">취소하기</button> 
	   			</div>
	   			<div class="fl">
	   				<div><button type="button" class="reservation_list_btn on" onclick="getReservationList()">예약된 예정</button></div>
	   				<div><button type="button" class="reservation_list_btn" onclick="getReservationCancelList()">취소된 예정</button></div>
	   			</div>
	   			<div class="reservation_list">
	   				<table id="reservation_table">
	   					<thead>
	   						<tr>
	   							<td><input type="checkbox" name="reservation_item" value="" class="checkbox_all"/></td>
	   							<td>숙소명</td>
	   							<td>인원</td>
	   							<td>일정</td>
	   							<td>예약일</td>
	   						</tr>
	   					</thead>
	   					<tbody>
	   					
	   					</tbody>
	   				</table>
	   			</div>
   			</div>
   		</div>
	
		<script>
			$(function(){
				getReservationList();
			});
		</script>
	</body>

</html>