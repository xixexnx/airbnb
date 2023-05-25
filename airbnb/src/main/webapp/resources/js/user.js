$(document).on("click", ".reservation_list_btn", function(e){
	$(".reservation_list_btn").removeClass("on");
	$(e.target).addClass("on");
});

function getReservationList(){
	$.ajax({
		 type: "GET"
		,url: "/reservation/list"
		,data: {
		}
		,success: function(data){
			var str = "";
			for(var i in data){
				str += `
					<tr>
						<td><input type="checkbox" name="reservation_item" value="${data[i].r_id}"/></td>
						<td onclick="getLodgingDetailView('${data[i].lodgingVo.l_id}')">${data[i].lodgingVo.l_name}</td>
						<td>${data[i].person}</td>
						<td>${data[i].start_date} ~ ${data[i].finish_date}</td>
						<td>${data[i].t_date}</td>
					</tr>	
				`;
			}
			$("#reservation_table td:nth-child(1)").show();
			$("#reservation_cancel_btn").show();
			$("#reservation_table tbody").html(str);
		}
	});
}

function getReservationCancelList(){
	$.ajax({
		 type: "GET"
		,url: "/reservation/cancelList"
		,data: {
		}
		,success: function(data){
			var str = "";
			for(var i in data){
				str += `
					<tr>
						<td><input type="checkbox" name="reservation_item" value="${data[i].r_id}"/></td>
						<td onclick="getLodgingDetailView('${data[i].lodgingVo.l_id}')">${data[i].lodgingVo.l_name}</td>
						<td>${data[i].person}</td>
						<td>${data[i].start_date} ~ ${data[i].finish_date}</td>
						<td>${data[i].t_date}</td>
					</tr>	
				`;
			}
			$("#reservation_table tbody").html(str);
			$("#reservation_cancel_btn").hide();
			$("#reservation_table td:nth-child(1)").hide();
		}
	});
}


function cancel_reservation(){
	var chk = $("input[name=reservation_item]:checked").not(".checkbox_all");
	if(chk.length == 0){
		alert("예약 건을 선택해주세요.");
		return false;
	}
	
	var result = confirm(`${chk.length}개의 예약건을 취소하겠습니까?`);
	var chk_list = [];
	
	if(result){
		for(var i=0; i<chk.length; i++){
	    	chk_list.push(chk[i].value);
		}

		$.ajax({
			 type: "DELETE"
			,url: "/reservation/list"
			,contentType: "application/json; charset=utf-8"
	        ,processData:false
			,dataType: "json"
			,data: JSON.stringify(chk_list)
			,success: function(data){
				alert(`${data}개의 예약건이 취소되었습니다.`);
				window.location.reload();
			}
		});
	}
	
}