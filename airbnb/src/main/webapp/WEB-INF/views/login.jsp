<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false"%>
<!-- <script src="https://developers.kakao.com/sdk/js/kakao.js"></script> -->
<script src="/js/join.js"></script>

<div class="login_box modal-content">
    <div class="login_header">
        <span> x </span>
        <b>로그인</b>
    </div>
    <form class="login_form" method="post" action="/login">
    	<span class="login_msg"></span>
        <input name="loginId" type="text" placeholder="아이디를 입력하세요."/>
        <input name="loginPw" type="password" placeholder="비밀번호를 입력하세요."/>
    
    <input type="button" value="로그인" id="air_login" class="login_btn" onclick="chkUserId()"/>
<!--     <div>또는</div> -->
<!--     <input type="button" id="kakao_login" class="login_btn" value="카카오톡으로 로그인하기"/> -->

	</form>
</div>
