package com.sy.bnb.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sy.bnb.model.UserVo;
import com.sy.bnb.service.MainService;
import com.sy.bnb.util.EncryptionUtils;

@Controller
public class LoginController {
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

	@Autowired
	MainService mainService;
	
	@ResponseBody
	@RequestMapping("/login")
	public Boolean login(HttpServletRequest req) {
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		Boolean loginChk = false;
		
		UserVo user = new UserVo();
		user.setUser_email(id);
		user.setUser_pw(EncryptionUtils.encryptSHA256(pw));
		user = mainService.login(user);
		HttpSession session = req.getSession();
		
		if(user != null) {
		    session.setAttribute("user_id", user.getUser_email());	
		    session.setAttribute("user_name", user.getUser_name());
		    loginChk = true;
		}
		return loginChk;
	}
	
	@RequestMapping("/logout")
	public String logout(HttpSession session) {
		 session.invalidate();
	     return "redirect:/";
	}
	
	
}
