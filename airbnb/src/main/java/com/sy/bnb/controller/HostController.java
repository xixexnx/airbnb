package com.sy.bnb.controller;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.service.HostService;

@Controller
@RequestMapping("/host")
public class HostController {

	@Autowired
	HostService hostService;

	@GetMapping("/hosting")
	public String gotoHosting() {
		return "host/hosting";
	}
	
	@GetMapping("")
	public String gotoHostPage() {
		return "host/main";
	}
	
	@ResponseBody
	@GetMapping("/facility")
	public List<Map<String, String>> getFacility(){
		return hostService.getFacility();
	}
	
	@ResponseBody
	@GetMapping("/theme")
	public List<Map<String, String>> getTheme(){
		return hostService.getTheme();
	}
	
	@ResponseBody
	@GetMapping("/structure")
	public List<Map<String, String>> getStructure(){
		return hostService.getStructure();
	}
	
	@ResponseBody
	@PostMapping("/hosting")
	public String hosting(HttpServletRequest req){        
		String user_email = " ";
		String l_name = req.getParameter("title");
		String l_addr = req.getParameter("host_loaction");
		String building_code = req.getParameter("structure");
		String bath_ea = req.getParameter("bath_no");
		String bedroom_ea = req.getParameter("bedroom_no");
		String bed_ea = req.getParameter("bed_no");
		String l_exp = req.getParameter("explanation");
		String basic_person = req.getParameter("guest_no");
		String basic_price = req.getParameter("price");
		basic_price = basic_price.replace("₩", "");
		
		String facility = req.getParameter("facility");
		String theme = req.getParameter("theme");
		
		List<String> facility_list = null;
		String[] theme_list = null;
		
		if(facility != null)
//			facility_list = facility.split(",");
		if(theme != null)
			theme_list = theme.split(",");

		LodgingVo vo = new LodgingVo();
		vo.setUser_email(user_email);
		vo.setL_name(l_name);
		vo.setL_addr(l_addr);
		vo.setBuilding_code(building_code);
		vo.setBath_ea(bath_ea);
		vo.setBedroom_ea(bedroom_ea);
		vo.setBed_ea(bed_ea);
		vo.setL_exp(l_exp);
		vo.setBasic_person(basic_person);
		vo.setBasic_price(basic_price);
		vo.setFacility_list(facility_list);
		vo.setTheme_list(theme_list);
		vo.setBasic_price(basic_price);
		
		// 기본 테이블 
		hostService.hosting(vo); 
		
		// 편의시설 테이블
		if(facility_list != null) 
			hostService.hosting_facility(vo);
		
		// 파일 업로드
		hostService.saveFile(req, vo);
		return "success";
	} 
	
	@GetMapping("/today")
	public String goTodayPage() {
		return "host/host_today";
	}
	
	@GetMapping("/calendar")
	public String goCalendarPage() {
		return "host/host_calendar";
	}
	
	@ResponseBody
	@GetMapping("/lodging/{user}")
	public List<LodgingVo> getUserLodging(HttpServletRequest req) {
		String user_email = " ";
		return hostService.getUserLodging(user_email);
	}
	
}
