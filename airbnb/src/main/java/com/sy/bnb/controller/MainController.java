package com.sy.bnb.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.model.ReservationVo;
import com.sy.bnb.service.MainService;
import com.sy.bnb.util.EncryptionUtils;

@Controller
public class MainController {
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);

	@Autowired
	MainService mainService;
	
	@RequestMapping("/")
	public String home() {
		return "main";
	}
	
	@ResponseBody
	@GetMapping("/id")
	public Boolean chkId(HttpServletRequest req) {
		String inputId = req.getParameter("inputId");
		return mainService.chkId(inputId);
	}
	

	@ResponseBody
	@PostMapping("/join")
	public int join(HttpServletRequest req) {
		String id = req.getParameter("id");
		String pw = req.getParameter("pw");
		String name = req.getParameter("name");
		String phone = req.getParameter("phone");
		
		Map<String, String> param = new HashMap<String, String>();
		param.put("id", id);
		param.put("pw", EncryptionUtils.encryptSHA256(pw));
		param.put("name", name);
		param.put("phone", phone);
		
		return mainService.join(param);
		
	}
	

	@ResponseBody
	@GetMapping("/theme")
	public List<Map<String, String>> getTheme() {
		return mainService.getTheme();
	}
	
	
	@ResponseBody
	@GetMapping("/lodging")
	public List<LodgingVo> getLodging(HttpServletRequest req) {
		String t_id = req.getParameter("t_id");
		String input_val = req.getParameter("input_val");
		String city_si = req.getParameter("city_si");
		String city_gu = req.getParameter("city_gu");
		String checkIn = req.getParameter("checkIn");
		String checkOut = req.getParameter("checkOut");
		String guest_no = req.getParameter("guest_no");
		
		Map<String, String> param = new HashMap<String, String>();
		
		if(t_id != null) {
			param.put("t_id", t_id);
		}
		if(city_si != null && city_si.replaceAll(" ",  "") != "") {
			if(city_gu != null && city_gu.replaceAll(" ", "") != "") {
				param.put("sel_val", city_si + " " + city_gu);
			}
		}
		if(input_val != null && input_val!= "") {
			param.put("input_val", input_val);
		}
		if(checkIn != null && checkIn != "") {
			param.put("checkIn", checkIn);
		}
		if(checkOut != null && checkOut != "") {
			param.put("checkOut", checkOut);
		}
		if(guest_no != null && guest_no != "") {
			param.put("guest_no", guest_no);
		}
		return mainService.getLodging(param);
	}
	
	@GetMapping("/lodging/{l_id}")
	public ModelAndView getLodgingDetail(@PathVariable String l_id) {
		LodgingVo vo = mainService.getLodgingDetail(l_id);
		return new ModelAndView("lodging_detail").addObject("vo", vo);
	}
	
	@ResponseBody
	@GetMapping("lodging/pic_url")
	public void inputPicture(HttpServletRequest req, HttpServletResponse res) {
		String url = req.getParameter("url");
		ServletOutputStream bout = null;
		FileInputStream f = null;
		try {
			bout = res.getOutputStream();
			f = new FileInputStream(url);
			int length= 0;
			byte[] buffer = new byte[10];
			while((length=f.read(buffer)) != -1) {
				bout.write(buffer, 0, length);
			}
		}catch (IOException e) {
				e.printStackTrace();
		}finally {
			try {
				if(bout != null) bout.close();
				if(f != null) f.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	@ResponseBody
	@PostMapping("reservation")
	public Boolean reservation(HttpServletRequest req, HttpSession session, @RequestParam(value="r_date_list[]") List<String> r_date_list) {
		String user_email = (String) session.getAttribute("user_id");
		String l_id = req.getParameter("l_id");
		String person = req.getParameter("person");
		
		List<String> disabledDate = mainService.getReservaiton_l_id(l_id);
		
		for(String date : disabledDate) {
			if(r_date_list.contains(date.split(" ")[0])) {
				return false;
			}
		}
		
		ReservationVo vo = new ReservationVo();
		vo.setUser_email(user_email);
		vo.setL_id(l_id);
		vo.setR_date_list(r_date_list);
		vo.setPerson(person);
		
		mainService.insertReservation(vo);
		return true;
		
	}
	
	@GetMapping("reservation")
	public String reservationPage(HttpSession session) {
		return "user/reservation";
	}
	
	@ResponseBody
	@GetMapping("reservation/list")
	public List<ReservationVo> getReservationList(HttpSession session) {
		String user_email = (String) session.getAttribute("user_id");
		return mainService.getReservationList(user_email);
	}
	
	@ResponseBody
	@GetMapping("reservation/cancelList")
	public List<ReservationVo> getReservationCanCelList(HttpSession session) {
		String user_email = (String) session.getAttribute("user_id");
		return mainService.getReservationCancelList(user_email);
	}
	
	@ResponseBody
	@DeleteMapping("reservation/list")
	public int deleteReservation(@RequestBody String[] r_id) {
		return mainService.deleteReservation(r_id);
	}
	
	@ResponseBody
	@GetMapping("lodging/reservation/{l_id}")
	public List<String> getReservation_lodging(@PathVariable String l_id){
		return mainService.getReservaiton_l_id(l_id);
	}
	

	@ResponseBody
	@GetMapping("city")
	public List<String> getCity_si(){
		return mainService.getCity_si();
	}
	
	@ResponseBody
	@GetMapping("city/si/{si}")
	public List<String> getCity_si(@PathVariable String si){
		return mainService.getCity_gu(si);
	}
	
	@ResponseBody
	@GetMapping("city/str")
	public List<String> getCity_str(HttpServletRequest req){
		String str = req.getParameter("str");
		return mainService.getCity_str(str);
	}
}
