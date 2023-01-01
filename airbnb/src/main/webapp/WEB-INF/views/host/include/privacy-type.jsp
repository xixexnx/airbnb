<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div>
	<div class="f_t_2">
		게스트가 사용할 숙소 유형
	</div>
	<div id="privacy_type_area">
		<div class="hosting_item">
			<button class="hosting_item_chk" onclick="chk_btn(this)" type="button" value="0">
				<div class="f_t_3">공간 전체</div>
				<div>게스트가 숙소 전체를 단독으로 사용합니다.</div>
			</button>
		</div>
		<div class="hosting_item">
			<button class="hosting_item_chk" onclick="chk_btn(this)" type="button" value="1">
				<div class="f_t_3">개인실</div>
				<div>게스트는 개인실에서 숙박하지만, 일부 공간은 호스트나 다른 사람과 함께 사용할 수 있습니다.</div>
			</button>
		</div>
		<div class="hosting_item">
			<button class="hosting_item_chk" onclick="chk_btn(this)" type="button" value="2">
				<div class="f_t_3">다인실</div>
				<div>게스트가 개인 공간 없이 호스트나 다른 사람과 함께 쓰는 침실이나 공용 공간에서 숙박합니다.</div>
			</button>
		</div>
	</div>
</div>