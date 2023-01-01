<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

<div class="register_box">
    <div class="register_header">
        <span> x </span>
        <b>회원가입</b>
    </div>

    <div class="register_form">
    	<div class="form_div form_id">
	        <label>아이디</label>
	        <input type="text" name="id" placeholder="ex)hong@bnb.com"/>
	        <span class="form_msg id_msg"></span>
        </div>
        <div class="form_div form_pw">
	        <label>비밀번호</label>
	        <input type="password" name="pw" placeholder="비밀번호를 입력하세요."/>
	        <span class="form_msg pw_msg"></span>
	    </div>
	    <div class="form_div form_pwchk">
	        <label>비밀번호 확인</label>
	        <input type="password" name="pwchk" placeholder="비밀번호를 입력하세요."/>
	        <span class="form_msg pwchk_msg"></span>
 	   </div>
 	   <div class="form_div">
	        <label>이름</label>
	        <input type="text" name="name" placeholder="이름을 입력하세요."/>
  	  </div>
  	  <div class="form_div">
        <label>연락처</label>
      	<div class="form_div_phone">
	        <input type="text" name="phone1" maxlength="3"/> - 
	        <input type="text" name="phone2" maxlength="4"/> - 
	        <input type="text" name="phone3" maxlength="4"/>
        </div>
     </div>
     
     <div>
     	<input type="button" value="회원가입" id="air_register" class="register_btn" onclick="join()" disabled="disabled"/>
     </div>
    </div>
</div>
