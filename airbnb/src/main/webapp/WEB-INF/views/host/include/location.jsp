<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div>
	<div class="f_t_2">
		숙소 위치는 어디인가요?
		<span class="subtitle">주소는 게스트의 예약이 확정된 이후에 공개됩니다.</span>
	</div>
	<div id="map_wrap">
		<div id="map"  style="width:500px;height:400px;">
		</div>
		<div id="map_search_div">
			<input type="text" name="host_location" id="map_search" placeholder="주소를 입력하세요."/>
			<ul id="map_search_result"></ul>	
		</div>
	</div>
	<div>
		<input type="text" class="place_input input-data" name="place_road" value="" readonly />
		<input type="text" class="place_input input-data" name="place_detail" value="" placeholder="상세주소를 입력하세요." />
	</div>
</div>