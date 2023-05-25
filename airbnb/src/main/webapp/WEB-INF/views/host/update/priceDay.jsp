<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<div id="ld_price" class="host_detail_div">
	<div class="ld_up_top up_btn_div">
		<div>요금</div>
	</div>
	<div class="ld_up_content">
		<div class="ld_up_list" id="ld_price_form">
			<div class="up_btn_div">
				<div class="modify_form">
					<div class="modify_title f_t_3">1박 요금
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
						<input id="ld_basic_price" type="text" class="modify_input price_input" data-value="<c:out value='${vo.basic_price }'/>" value="<c:out value='${vo.basic_price }'/>" readonly/>
					</div>
				</div>
				<div class="show_modify_btn">
					<button id="privacy_modify_btn" type="button" class="detail_up_btn" onclick="openModifyForm(this)">수정</button>
				</div>
			</div>
			<div class="modify_footer" style="display: none;">
				<button class="close_modify_btn" type="button" onclick="close_modify_btn(this)">취소</button>
				<button class="apply_modify_btn" type="button" onclick="update_ld_price()" disabled="disabled">저장하기</button>
			</div>
		</div>
	</div>
</div>