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
    
	<title>숙소 관리 - 에어비앤비</title>	
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
		<div class="f_t_3" style="padding-left: 24px;">숙소 <span id="lodging_ea">N</span>개</div>
		<div class="lodging_list_nav">
			<div class="lodging_list_filter">
				<div>
					<button id="search_room_state" type="button" class="lodging_search_btn" onclick="openSearchDiv()">침실 및 침대
						<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; margin-left: 5px; fill: rgb(113, 113, 113); height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;" aria-hidden="true" role="presentation" focusable="false">
							<g fill="none">
								<path d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932">
								</path>
							</g>
						</svg>
					</button>
					<div class="search_option modal-content" style="display:none;">
						<div class="up_btn_div">
							<div>침실</div>
							<div class="p_m_btn">
								<button type="button" class="minus-btn" style="min-width:none;">-</button>
								<div id="search_bedroom_ea">0</div>
								<button type="button" class="plus-btn">+</button>
							</div>
						</div>
						<div class="up_btn_div">
							<div>침대</div>
							<div class="p_m_btn">
								<button type="button" class="minus-btn" style="min-width:none;">-</button>
								<div id="search_bed_ea">0</div>
								<button type="button" class="plus-btn">+</button>
							</div>
						</div>
						<div class="up_btn_div">
							<div>욕실</div>
							<div class="p_m_btn">
								<button type="button" class="minus-btn" style="min-width:none;">-</button>
								<div id="search_bath_ea">0</div>
								<button type="button" class="plus-btn">+</button>
							</div>
						</div>
						<div class="search_opt_btn">
							<button class="searchApply_btn" type="button" onclick="searchOptApply()">적용하기</button>
						</div>
					</div>
				</div>
<!-- 				<button type="button" class="lodging_search_btn">편의시설 -->
<!-- 					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; margin-left: 5px; fill: rgb(113, 113, 113); height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;" aria-hidden="true" role="presentation" focusable="false"> -->
<!-- 						<g fill="none"> -->
<!-- 							<path d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932"> -->
<!-- 							</path> -->
<!-- 						</g> -->
<!-- 					</svg> -->
<!-- 				</button> -->
				<div>
				<button id="search_ld_state" type="button" class="lodging_search_btn" onclick="openStateOpt()">숙소 상태
					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; margin-left: 5px; fill: rgb(113, 113, 113); height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;" aria-hidden="true" role="presentation" focusable="false">
						<g fill="none">
							<path d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932">
							</path>
						</g>
					</svg>
				</button>
				<div class="search_state_option modal-content" style="display: none;">
					<div>
						<input type="checkbox" name="ld_state" value="ON"/> 
						<span>운영 중</span>
					</div>
					<div>
						<input type="checkbox" name="ld_state" value="OFF"/>
						<span>운영 중지</span>
					</div>
					<div class="search_opt_btn">
						<button class="searchApply_btn" type="button" onclick="searchOptApply()">적용하기</button>
					</div>
				</div>
				</div>
			</div>
			</div>
		<div>
<!-- 		 data-width="100" data-toggle="table" data-sortable="true" data-id-field="l_id" data-ajax="ajaxRequest" data-locale="en-US" -->
			<table 
				id="table" 
				data-toggle="table" 
				data-url="/host/lodging"  
				data-sortable="true"
				data-search="true"
				data-row-attributes="rowAttributes">
				<thead>
					<tr>
<!-- 						<th data-checkbox="true" data-field=""></th>	 -->
						<th data-field="l_name" data-sortable="true">숙소</th>
						<th data-field="l_state" data-sortable="true">상태</th>
						<th data-field="bedroom_ea" data-sortable="true">침실</th>
						<th data-field="bed_ea" data-sortable="true">침대</th>
						<th data-field="bath_ea" data-sortable="true">욕실</th>
						<th data-field="l_addr1" data-sortable="true">위치</th>
						<th data-field="l_id" data-visible="false"></th>
<!-- 						<th data-field="date" data-sortable="true">최종 수정일</th> -->
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
			      'data-href': '/host/lodging/' + row.l_id + '/detail'
			    }
		}
		
		$(function(){
			$("#table").on('load-success.bs.table', function () {
				$("#lodging_ea").html($("tbody>tr").length);
			});
		});
	</script>
</body>
</html>