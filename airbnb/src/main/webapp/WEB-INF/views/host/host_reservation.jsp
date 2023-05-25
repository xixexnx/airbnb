<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="/js/host.js"></script>
    <script src="/js/main.js"></script>

	<!-- bootstrap table -->
	<link href="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.css" rel="stylesheet">
	<script src="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.js"></script>
  
    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/host.css"/>
    <link rel="stylesheet" href="/css/table.css"/>
    
	<title>예약 관리 - 에어비앤비</title>	
	<link rel="icon" href="/image/logo.png">
</head>
<body>
	<div class="wrap">
		<div class="modal-wrap modal"></div>
		<div class="header">
			<div class="logo-div" onclick="location.href='/host'">
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
	
		<div class="host_content-wide">
			<div class="fl">
	 			<div><button type="button" class="reservation_list_btn host on" onclick="" value="after">예약된 예정</button></div>
				<div><button type="button" class="reservation_list_btn host" onclick="" value="before">지난 예정</button></div> 			
			</div>
			<div>
				<div class="f_t_3" style="padding-left: 24px;">예약 <span id="reservation_ea">N</span>개</div>
			</div>
			<div>
				<table 
					id="table" 
					data-toggle="table" 
					data-url="/host/reservation/list"
					data-query-params="queryParams"
					data-sortable="true"
					data-search="true"
					data-row-attributes="rowAttributes">
					<thead>
						<tr>
	<!-- 						<th data-checkbox="true" data-field=""></th>	 -->
							<th data-field="lodgingVo.l_name" data-sortable="true">숙소</th>
							<th data-field="t_date" data-sortable="true">예약 일자</th>
							<th data-field="person" data-sortable="true">인원</th>
							<th data-field="start_date" data-sortable="true">체크인 날짜</th>
							<th data-field="finish_date" data-sortable="true">체크아웃 날짜</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
	<script>
		function rowAttributes(row, index){
			return {
			      'data-toggle': 'popover',
			      'data-placement': 'bottom',
			      'data-trigger': 'hover',
			      'onclick': 'event.cancelBubble=true', 
			    }
		}
		
		  function queryParams(params) {
			    params.isOver = $(".reservation_list_btn.host.on").val();
		    return params;
		  }
		  
		  
		$(function(){
			$("#table").on('load-success.bs.table', function () {
				$("#reservation_ea").html($("tbody>tr").length);
			});
		});
	</script>
</body>
</html>