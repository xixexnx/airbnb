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
<script>
	var markers = [];

	var container = document.getElementById('map');
	var options = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 2
	};

	var map = new kakao.maps.Map(container, options);
	
	var ps = new kakao.maps.services.Places();
	
	$("#map_search").on("keyup", function(){
	 	searchPlaces();
	});
	
	$(document).on("click", ".lo_item", function(e){
		chooseLi(e);	
	});
	
	function searchPlaces() {
	    var keyword = document.getElementById('map_search').value;

	    if (!keyword.replace(/^\s+|\s+$/g, '')) {
	    	var listEl = document.getElementById('map_search_result');
	    	removeAllChildNods(listEl);
		    removeMarker();
	    	return false;
	    }
	    ps.keywordSearch(keyword, placesSearchCB); 
	}
	
	function placesSearchCB(data, status, pagination) {
	    if (status === kakao.maps.services.Status.OK) {
	        displayPlaces(data);
	    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
	    	// 검색 결과 없음
	        return;
	    } else if (status === kakao.maps.services.Status.ERROR) {
	        alert('검색 결과 중 오류가 발생했습니다.');
	        return;
	    }
	}
	
	function displayPlaces(places) {
	    var listEl = document.getElementById('map_search_result'), 
	    menuEl = document.getElementById('map_search_div'),
	    fragment = document.createDocumentFragment(), 
	    bounds = new kakao.maps.LatLngBounds(), 
	    listStr = '';
	    
	    removeAllChildNods(listEl);
	    removeMarker();
	    
	    for ( var i=0; i<places.length; i++ ) {

	        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
	            marker = addMarker(placePosition, i), 
	            itemEl = getListItem(i, places[i]);

	        bounds.extend(placePosition);

	        fragment.appendChild(itemEl);
	    }

	    listEl.appendChild(fragment);
	    menuEl.scrollTop = 0;
	    
	    map.setBounds(bounds);
	}
	
	function getListItem(index, places) {

	    var el = document.createElement('li'),
	    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
	                '<div class="lo_info">' +
	                '   <div class="lo_title">' + places.place_name + '</div>';

	    if (places.road_address_name) {
	        itemStr += '    <div class="lo_road_address">' + places.road_address_name + '</div>' +
	                    '   <div class="lo_address">' +  places.address_name  + '</div>';
	    } else {
	        itemStr += '    <div class="lo_address">' +  places.address_name  + '</div>'; 
	    }        

	    el.innerHTML = itemStr;
	    el.className = 'lo_item';

	    return el;
	}
	
	function addMarker(position, idx, title) {
	    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
	        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
	        imgOptions =  {
	            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
	            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
	            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
	        },
	        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
	            marker = new kakao.maps.Marker({
	            position: position, // 마커의 위치
	            image: markerImage 
	        });

	    marker.setMap(map); // 지도 위에 마커를 표출합니다
	    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

	    return marker;
	}
	
	function removeMarker() {
	    for ( var i = 0; i < markers.length; i++ ) {
	        markers[i].setMap(null);
	    }   
	    markers = [];
	}
	
	function removeAllChildNods(el) {   
	    while (el.hasChildNodes()) {
	        el.removeChild (el.lastChild);
	    }
	}
	
	function chooseLi(e){
		var place = "";
		if($(e.target).hasClass("lo_item")){
			place = $($(e.target).find(" .lo_road_address")[0]).html();
		}else{
			place = $($(e.target).parent().find(" .lo_address")[0]).html();
		}
		$("input[name=place_road]").val(place);
	}
</script>