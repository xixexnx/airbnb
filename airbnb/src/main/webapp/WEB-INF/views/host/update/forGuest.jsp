<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div id="ld_before" class="host_detail_div">
	<div class="ld_up_top up_btn_div">
		<div>예약 전 정보</div>
	</div>
	<div class="ld_up_content">
		<div class="ld_up_list up_btn_div">
			<div>
				<div>체크인 가능 시간</div>
				<div class="detail_val"><c:out value='${vo.checkin }'/></div>
			</div>
			<div>
				<button type="button" class="detail_up_btn">수정</button>
			</div>
		</div>
		<div class="ld_up_list up_btn_div">
			<div>
				<div>체크아웃 시간</div>
				<div class="detail_val"><c:out value='${vo.checkout}'/></div>
			</div>
			<div>
				<button type="button" class="detail_up_btn">수정</button>
			</div>
		</div>
	</div>
</div>
