var markers = [];

var container;
var options;

var map;

var ps = new kakao.maps.services.Places();	;

$(function(){
	initMap();
	
	$("#map_search").on("keyup", function(){
 		searchPlaces();
	});
	
});

$(document).on("click", ".lo_item", function(e){
	chooseLi(e);	
});


function initMap(){
	container = document.getElementById('map');
	options = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 2
	};

	map = new kakao.maps.Map(container, options);
};

function searchPlaces() {
    var keyword = document.getElementById('map_search').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
    	var listEl = document.getElementById('map_search_result');
    	removeAllChildNods(listEl);
    	return false;
    }
    ps.keywordSearch(keyword, placesSearchCB);
}

function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        makePlaceList(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    	// 검색 결과 없음
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
    }
}

function makePlaceList(places) {
    var listEl = document.getElementById('map_search_result'), 
    menuEl = document.getElementById('map_search_div'),
    fragment = document.createDocumentFragment(), 
    bounds = new kakao.maps.LatLngBounds(), 
    listStr = '';
    
    removeAllChildNods(listEl);
    
    for ( var i=0; i<places.length; i++ ) {
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            itemEl = getListItem(i, places[i]);

        fragment.appendChild(itemEl);
    }

    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;
    
    /*map.setBounds(bounds);*/
}

function displayPlaces(place){
	removeMarker();
	var geocoder = new kakao.maps.services.Geocoder();

	// 주소로 좌표를 검색합니다
	geocoder.addressSearch(place, function(result, status) {
		
	    // 정상적으로 검색이 완료됐으면 
	     if (status === kakao.maps.services.Status.OK) {
	
	        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
			
	        // 결과값으로 받은 위치를 마커로 표시합니다
	        var marker = new kakao.maps.Marker({
	            map: map,
	            position: coords
	        });
			markers.push(marker);
	        // 인포윈도우로 장소에 대한 설명을 표시합니다
	       /* var infowindow = new kakao.maps.InfoWindow({
	           content: '<div style="width:150px;text-align:center;padding:6px 0;"></div>'
	        });
	        infowindow.open(map, marker);*/
	
	        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
	        map.setCenter(coords);
	    } 
	});    
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
	
	displayPlaces(place);
}