package com.sy.bnb.util;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.springframework.web.servlet.mvc.WebContentInterceptor;

public class AuthInterceptor extends WebContentInterceptor{
	 /**
     * 세션에 계정정보(SessionVO)가 있는지 여부로 인증 여부를 체크한다. 계정정보(SessionVO)가 없다면, 로그인 페이지로 이동한다.
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws ServletException {
    	HttpSession session = request.getSession();
        try {
        	String user_id = (String) session.getAttribute("user_id");
            
            if (user_id != null) {
                return true;
            } else {
            	logger.info("current user is not logined");
//            	response.sendRedirect("/");
//            	return true;
                ModelAndView modelAndView = new ModelAndView("redirect:/");
                modelAndView.addObject("msgCode", "로그인이 필요한 기능입니다.");
                modelAndView.addObject("returnUrl", "/");
                throw new ModelAndViewDefiningException(modelAndView);
            }
        } catch (Exception e) {
            ModelAndView modelAndView = new ModelAndView("redirect:/");
            modelAndView.addObject("msgCode", "로그인이 필요한 기능입니다.");
            modelAndView.addObject("returnUrl", "/");
            throw new ModelAndViewDefiningException(modelAndView);
        }
    }
}
