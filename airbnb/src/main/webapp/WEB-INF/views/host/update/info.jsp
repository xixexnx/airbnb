<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!-- <div id="ld_pic" class="host_detail_div">
	<div class="ld_up_top up_btn_div">
		<div class="modify_title f_t_3">사진</div>
		<div class="show_modify_btn">
			<button type="button" class="detail_up_btn">수정</button>
		</div>
	</div>
	<div class="ld_up_content">
		
	</div>
</div> -->

<div id="id_basic_info" class="host_detail_div">
	<div class="ld_up_top">
		<div>숙소 기본 정보</div>
	</div>
	<div class="ld_up_content">
		<div class="ld_up_list" id="ld_title_form">
			<div class="up_btn_div">
				<div class="modify_form">
					<div class="modify_title f_t_3">숙소 제목
						<span class="close_modify" onclick="close_modify(this)" style="display: none;">
							<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: rgb(113, 113, 113); stroke-width: 3; overflow: visible;">
								<path d="m6 6 20 20">
								</path>
								<path d="m26 6-20 20">
								</path>
							</svg>
						</span>
					</div>
					<div><input name="ld_title" class="modify_input" type="text" data-value="<c:out value='${vo.l_name }'/>" value="<c:out value='${vo.l_name }'/>" readonly/></div>
				</div>
				<div class="show_modify_btn">
					<button type="button" class="detail_up_btn" onclick="openModifyForm(this)">수정</button>
				</div>
			</div>
			<div class="modify_footer" style="display: none;">
				<button class="close_modify_btn" type="button" onclick="close_modify_btn(this)">취소</button>
				<button class="apply_modify_btn" type="button" onclick="update_ld_title()" disabled="disabled">저장하기</button>
			</div>
		</div>

		<div class="ld_up_list" id="ld_exp_form">
			<div class="up_btn_div">
				<div class="modify_form">
					<div class="modify_title f_t_3">숙소 설명
						<span class="close_modify" onclick="close_modify(this)" style="display: none;">
							<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: rgb(113, 113, 113); stroke-width: 3; overflow: visible;">
								<path d="m6 6 20 20">
								</path>
								<path d="m26 6-20 20">
								</path>
							</svg>
						</span>
					</div>
					<%
					    //치환 변수 선언
					    pageContext.setAttribute("crcn", "\r\n"); 
					    pageContext.setAttribute("br", "<br>"); 
					%>
					<textarea onkeydown="resize(this)" class="detail_val" data-value="<c:out value='${fn:replace(vo.l_exp, br, crcn) }' escapeXml="false" />" readonly><c:out value='${fn:replace(vo.l_exp, br, crcn) }' escapeXml="false" /></textarea>
				</div>
				<div class="show_modify_btn">
					<button type="button" class="detail_up_btn" onclick="openModifyForm(this)">수정</button>
				</div>
			</div>
			<div class="modify_footer" style="display: none;">
				<button class="close_modify_btn" type="button" onclick="close_modify_btn(this)">취소</button>
				<button class="apply_modify_btn" type="button" onclick="update_ld_exp()" disabled="disabled">저장하기</button>
			</div>
		</div>
		
		<div class="ld_up_list" id="ld_guest_form">
			<div class="up_btn_div">
				<div class="modify_form">
					<div class="modify_title f_t_3">게스트 수
						<span class="close_modify" style="display: none;">
							<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: rgb(113, 113, 113); stroke-width: 3; overflow: visible;">
								<path d="m6 6 20 20">
								</path>
								<path d="m26 6-20 20">
								</path>
							</svg>
						</span>
					</div>
				</div>
				<div class="p_m_btn">
					<button type="button" class="minus-btn modifyGuest">-</button>
					<div id="basic_person_no"><c:out value='${vo.basic_person }'/></div>
					<button type="button" class="plus-btn modifyGuest">+</button>
				</div>
			</div>
		</div>
		
		<div class="ld_up_list" id="ld_state_form">
			<div class="up_btn_div">
				<div class="modify_form">
					<div class="modify_title f_t_3">숙소 상태
						<span class="close_modify" onclick="close_modify(this)" style="display: none;">
							<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: rgb(113, 113, 113); stroke-width: 3; overflow: visible;">
								<path d="m6 6 20 20">
								</path>
								<path d="m26 6-20 20">
								</path>
							</svg>
						</span>
					</div>
					<div class="forView">
						<c:if test = "${vo.l_state eq 'ON'}"> 
							<svg viewBox="0 0 16 16" role="img" aria-hidden="true" aria-label="운영 중" focusable="false" style="height: 10px; width: 10px; fill: green;">
								<ellipse cx="8" cy="8" fill-rule="evenodd" rx="8" ry="8">
								</ellipse>
							</svg>
							<span>운영 중</span>
						</c:if>
						
						<c:if test = "${vo.l_state eq 'OFF'}"> 
							<svg viewBox="0 0 16 16" role="img" aria-hidden="false" aria-label="운영 중지" focusable="false" style="height: 10px; width: 10px; fill: rgb(193, 53, 21);">
								<ellipse cx="8" cy="8" fill-rule="evenodd" rx="8" ry="8">
								</ellipse>
							</svg>
							<span>운영 중지</span>
						</c:if>
					</div>
					<div id="ld_state_modify_div" class="forModify" style="display:none;" data-value="<c:out value='${vo.l_state }'/>" >
						<c:if test = "${vo.l_state eq 'ON'}"> 
							<div class="optionState">
								<input type="radio" name="ld_state" value="ON" checked /> 운영 중
							</div>
							<div class="optionState">
								<input type="radio" name="ld_state" value="OFF"/> 운영 중지
							</div>
						</c:if>
						<c:if test = "${vo.l_state eq 'OFF'}"> 
							<div class="optionState">
								<input type="radio" name="ld_state" value="ON"/> 운영 중
							</div>
							<div class="optionState">
								<input type="radio" name="ld_state" value="setOFF" checked/> 운영 중지
							</div>
						</c:if>
					</div>
				</div>
				<div class="show_modify_btn">
					<button type="button" class="detail_up_btn" onclick="openModifyForm(this)">수정</button>
				</div>
			</div>
			<div class="modify_footer" style="display: none;">
				<button class="close_modify_btn" type="button" onclick="close_modify_btn(this)">취소</button>
				<button id="ld_state_apply_btn" class="apply_modify_btn" type="button" onclick="update_ld_state()" disabled="disabled">저장하기</button>
			</div>
		</div>
	</div>
</div>

<div id="ld_facility" class="host_detail_div">
	<div class="ld_up_list" id="ld_state_form">
		<div class="up_btn_div">
			<div class="modify_title f_t_3">편의시설
				<span class="close_modify" onclick="close_modify(this)" style="display: none;">
					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: rgb(113, 113, 113); stroke-width: 3; overflow: visible;">
						<path d="m6 6 20 20">
						</path>
						<path d="m26 6-20 20">
						</path>
					</svg>
				</span>
			</div>
			<div class="show_modify_btn">
				<button id="facility_up_btn" type="button" class="detail_up_btn" onclick="getModifyFacility()">수정</button>
			</div>
		</div>
	</div>
</div>
<div style="display:none;" id="facility_modify_div" class="modal-content">
	<div id="facility_modify_list">
	
	</div>
	<div class="modify_footer" id="facility_modify_footer">
		<button class="close_modify_btn" type="button" onclick="close_facility_btn()">취소</button>
		<button id="ld_facility_apply_btn" class="apply_modify_btn" type="button" onclick="update_ld_facility()" disabled="disabled">저장하기</button>
	</div>
</div>


<div id="ld_location" class="host_detail_div">
	<div class="ld_up_top">
		<div>위치</div>
	</div>
	<div class="ld_up_content">
		<div class="ld_up_list" id="ld_addr_form">
			<div class="up_btn_div">
				<div class="modify_form">
					<div class="modify_title f_t_3">주소
						<span class="close_modify" onclick="close_modify(this)" style="display: none;">
							<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: rgb(113, 113, 113); stroke-width: 3; overflow: visible;">
								<path d="m6 6 20 20">
								</path>
								<path d="m26 6-20 20">
								</path>
							</svg>
						</span>
					</div>
					<div class=""><input type="text" class="modify_input" name="ld_addr" data-value="<c:out value='${vo.l_addr}'/>" value="<c:out value='${vo.l_addr}'/>" readonly/></div>
				</div>
				<div class="show_modify_btn">
					<button type="button" class="detail_up_btn" onclick="openModifyForm(this)">수정</button>
				</div>
			</div>
			<div class="modify_footer" style="display: none;">
				<button class="close_modify_btn" type="button" onclick="close_modify_btn(this)">취소</button>
				<button class="apply_modify_btn" type="button" onclick="update_ld_addr()" disabled="disabled">저장하기</button>
			</div>
		</div>
	</div>
</div>

<div id="ld_info" class="host_detail_div">
	<div class="ld_up_top">
		<div>숙소 및 객실</div>
	</div>
	<div class="ld_up_content">
		<div class="ld_up_list" id="ld_privacy_form">
			<div class="up_btn_div">
				<div class="modify_form">
					<div class="modify_title f_t_3">숙소 유형
						<span class="close_modify" onclick="close_modify(this)" style="display: none;">
							<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: rgb(113, 113, 113); stroke-width: 3; overflow: visible;">
								<path d="m6 6 20 20">
								</path>
								<path d="m26 6-20 20">
								</path>
							</svg>
						</span>
					</div>
					<div class="forView">
						<div id="ld_sid" data-value="${vo.sid }"><c:out value="${vo.building_code }"/></div>
					</div>
					<div id="host_privacy_type_area" class="forModify" style="display:none;">
					</div>
				</div>
				<div class="show_modify_btn">
					<button id="privacy_modify_btn" type="button" class="detail_up_btn" onclick="openModifyForm(this)">수정</button>
				</div>
			</div>
			<div class="modify_footer" style="display: none;">
				<button class="close_modify_btn" type="button" onclick="close_modify_btn(this)">취소</button>
				<button class="apply_modify_btn" type="button" onclick="update_ld_privacy()" disabled="disabled">저장하기</button>
			</div>
		</div>
		
		<div class="ld_up_list">
			<div class="up_btn_div">
				<div class="modify_form">
					<div class="modify_title f_t_3">방 및 기타공간
						<span class="close_modify" onclick="close_modify(this)" style="display: none;">
							<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 16px; width: 16px; stroke: rgb(113, 113, 113); stroke-width: 3; overflow: visible;">
								<path d="m6 6 20 20">
								</path>
								<path d="m26 6-20 20">
								</path>
							</svg>
						</span>
					</div>
					<div class="detail_val">
						<div class="up_btn_div">
							<div>침대</div>
							<div class="p_m_btn">
								<button type="button" class="minus-btn modifyBed">-</button>
								<div id="ld_bed_ea"><c:out value="${vo.bed_ea }"/></div>
								<button type="button" class="plus-btn modifyBed">+</button>
							</div>
						</div>
						<div class="up_btn_div">
							<div>침실</div>
							<div class="p_m_btn">
								<button type="button" class="minus-btn modifyBedroom">-</button>
								<div id="ld_bedroom_ea"><c:out value="${vo.bedroom_ea }"/></div>
								<button type="button" class="plus-btn modifyBedroom">+</button>
							</div>
						</div>
						<div class="up_btn_div">
							<div>욕실</div>
							<div class="p_m_btn">
								<button type="button" class="minus-btn modifyBath">-</button>
								<div id="ld_bath_ea"><c:out value="${vo.bath_ea }"/></div>
								<button type="button" class="plus-btn modifyBath">+</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>