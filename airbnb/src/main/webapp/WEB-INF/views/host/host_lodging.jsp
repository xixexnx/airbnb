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

<!--     <script src="/js/bootstrap-table.js"></script> -->
	<!-- bootstrap table -->
	<link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.css">
	<script src="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.js"></script>
	<script src="https://unpkg.com/bootstrap-table@1.21.2/dist/locale/bootstrap-table-zh-CN.min.js"></script>
  
    <link rel="stylesheet" href="/css/main.css"/>
    <link rel="stylesheet" href="/css/host.css"/>
   
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.css">
    
    <link rel="icon" href="/image/logo.png">
	<title>숙소 관리 - 에어비앤비</title>
</head>
<body>
	<div class="wrap">
		<div class="modal-wrap" style="display:none;"></div>
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
	</div>
	
	<div class="host_content-wide">
		<div>숙소 N개</div>
		<div class="lodging_list_nav">
			<div class="lodging_list_search">
			
			</div>
			<div class="lodging_list_filter">
				<button type="button">침실 및 침대
					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; margin-left: 5px; fill: rgb(113, 113, 113); height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;" aria-hidden="true" role="presentation" focusable="false">
						<g fill="none">
							<path d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932">
							</path>
						</g>
					</svg>
				</button>
				<button type="button">편의시설
					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; margin-left: 5px; fill: rgb(113, 113, 113); height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;" aria-hidden="true" role="presentation" focusable="false">
						<g fill="none">
							<path d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932">
							</path>
						</g>
					</svg>
				</button>
				<button type="button">숙소 상태
					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: block; margin-left: 5px; fill: rgb(113, 113, 113); height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;" aria-hidden="true" role="presentation" focusable="false">
						<g fill="none">
							<path d="m28 12-11.2928932 11.2928932c-.3905243.3905243-1.0236893.3905243-1.4142136 0l-11.2928932-11.2928932">
							</path>
						</g>
					</svg>
				</button>
			</div>
		</div>
		<div>
<!-- 		 data-width="100" data-toggle="table" data-sortable="true" data-id-field="l_id" data-ajax="ajaxRequest" data-locale="en-US" -->
			<table id="table" data-toggle="table" data-click-to-select="true" data-locale="en-US" style="display:none;">
				<thead>
					<tr>
						<th data-checkbox="true" data-field=""></th>	
						<th data-field="l_name" data-sortable="true">숙소</th>
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
	
	<script>
		$(function(){
			initTable1();	
		});
		
		function initTable(){
			 $("#table").bootstrapTable('destroy').bootstrapTable({
			      height: 550,
			      locale: 'en-US',
			      columns: [
			        [{
			          field: 'state',
			          checkbox: true,
			        }, {
			          title: '숙소',
			          field: 'l_name',
			          sortable: true,
			        }, {
			          title: '침실',
			          field: 'bedroom_ea',
			          sortable: true,
			        }, {
			          title: '침대',
			          field: 'bed_ea',
			          sortable: true,
			        }, {
			          title: '욕실',
			          field: 'bath_ea',
			          sortable: true,
			        }, {
			          title: '위치',
			          field: 'l_addr1',
			          sortable: true,
			        }, {
			          title: 'l_id',
			          field: 'l_id',
			          sortable: true,
			        }]
			      ]
			    })
		}
		
		function ajaxRequest(params){
			var url = "/host/lodging";
			$.get(url + '?' + $.param(params.data)).then(function (res) {
				params.success(res);
			});
		}
		
	</script>
</body>
</html>