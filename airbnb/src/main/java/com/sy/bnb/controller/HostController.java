package com.sy.bnb.controller;


import java.io.File;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.service.HostService;
import com.sy.bnb.service.MainService;

@Controller
@RequestMapping("/host")
public class HostController {
	
	private static final Logger logger = LoggerFactory.getLogger(HostController.class);

	@Autowired
	HostService hostService;
	
	@Autowired
	MainService mainService;

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
	public String hosting(HttpServletRequest req, HttpSession session){        
		String user_email = (String) session.getAttribute("user_id");
		String l_name = req.getParameter("title");
		String l_addr = req.getParameter("host_loaction");
		String building_code = req.getParameter("structure");
		String bath_ea = req.getParameter("bath_no");
		String bedroom_ea = req.getParameter("bedroom_no");
		String bed_ea = req.getParameter("bed_no");
		String l_exp = req.getParameter("explanation").replaceAll("\r\n", "<br>");
		String basic_person = req.getParameter("guest_no");
		String basic_price = req.getParameter("price");
		basic_price = basic_price.replace("₩", "");
		
		String facility = req.getParameter("facility");
		String theme = req.getParameter("theme");
		
		List<String> facility_list = new ArrayList<String>();
		List<String> theme_list = new ArrayList<String>();
		
		if(facility != null) {
			for(int i=0; i<facility.split(",").length; i++) {
				if(facility.split(",")[i]!=null){
					facility_list.add(facility.split(",")[i]);
				}
			}
		}
		
		if(theme != null) {
			for(int i=0; i<theme.split(",").length; i++) {
				if(theme.split(",")[i]!=null){
					theme_list.add(theme.split(",")[i]);
				}
			}
		}
		
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
		vo.setFacility_list_string(facility_list);
		vo.setTheme_list_string(theme_list);
		vo.setBasic_price(basic_price);
		
		// 기본 테이블 
		hostService.hosting(vo); 
		
		// 편의시설 테이블
		if(facility_list.size() != 0) 
			hostService.hosting_facility(vo);
		
		// 테마 테이블
		if(theme_list.size() != 0)
			hostService.hosting_theme(vo);
		
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
	
	@GetMapping("/list")
	public String goLodgingManagePage() {
		return "host/host_lodging";
	}
	
	@ResponseBody
	@GetMapping("/lodging")
	public List<LodgingVo> getUserLodging(HttpSession session) {
		String user_email = (String) session.getAttribute("user_id");
		List<LodgingVo> list = hostService.getUserLodging(user_email);
		return list;
	}
	
	@ResponseBody
	@GetMapping("/lodging/{l_id}")
	public LodgingVo getLodging(@PathVariable String l_id) {
		LodgingVo vo = mainService.getLodgingDetail(l_id);
		return vo;
	}
	
	@ResponseBody
	@GetMapping("/hosting-manage")
	public String getHostingManage(HttpServletRequest req) {
		String l_id = req.getParameter("l_id");
		String l_date = req.getParameter("l_date");
		
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("l_id", l_id);
		param.put("l_date", l_date);
		
		return hostService.getHostingManage(param);
	}
	
	@ResponseBody
	@GetMapping("/hosting-manage/{l_id}")
	public List<String> getHostingManage(@PathVariable String l_id) {
		return hostService.getHostingManage(l_id);
	}
	
	@ResponseBody
	@PostMapping("/hosting-manage")
	public int updateHostingManage_insert(HttpServletRequest req) {
		String l_id = req.getParameter("l_id");
		String l_date = req.getParameter("l_date");
		
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("l_id", l_id);
		param.put("l_date", l_date);
		
		return hostService.insertHostingManage(param);
	}
	
	@ResponseBody
	@DeleteMapping("/hosting-manage")
	public int updateHostingManage_delete(HttpServletRequest req) {
		String l_id = req.getParameter("l_id");
		String l_date = req.getParameter("l_date");
		
		HashMap<String, String> param = new HashMap<String, String>();
		param.put("l_id", l_id);
		param.put("l_date", l_date);
		
		return hostService.deleteHostingManage(param);
	
	}
}

