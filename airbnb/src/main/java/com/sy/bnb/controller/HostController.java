package com.sy.bnb.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.model.ReservationVo;
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
	public List<Map<String, String>> getFacility() {
		return hostService.getFacility();
	}

	@ResponseBody
	@GetMapping("/theme")
	public List<Map<String, String>> getTheme() {
		return hostService.getTheme();
	}

	@ResponseBody
	@GetMapping("/structure")
	public List<Map<String, String>> getStructure() {
		return hostService.getStructure();
	}

	@ResponseBody
	@PostMapping("/hosting")
	public String hosting(HttpServletRequest req, HttpSession session) {
		String user_email = (String) session.getAttribute("user_id");

		if (user_email == null) {
			return "session Exception";
		}

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

		if (facility != null) {
			for (int i = 0; i < facility.split(",").length; i++) {
				if (facility.split(",")[i] != null) {
					facility_list.add(facility.split(",")[i]);
				}
			}
		}

		if (theme != null) {
			for (int i = 0; i < theme.split(",").length; i++) {
				if (theme.split(",")[i] != null) {
					theme_list.add(theme.split(",")[i]);
				}
			}
		}

		LodgingVo vo = new LodgingVo(user_email, xssFilter(l_name), xssFilter(l_addr), building_code, bath_ea,
				bedroom_ea, bed_ea, xssFilter(l_exp), basic_person, basic_price, facility_list, theme_list);

		hostService.hosting(vo);

		if (facility_list.size() != 0)
			hostService.hosting_facility(vo);

		if (theme_list.size() != 0)
			hostService.hosting_theme(vo);

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

	@GetMapping("/reservation")
	public String gotoReservationList() {
		return "host/host_reservation";
	}

	@ResponseBody
	@GetMapping("/reservation/list")
	public List<ReservationVo> getReservationList(HttpSession session, HttpServletRequest req) {
		String isOver = (String) req.getParameter("isOver");
		String user_email = (String) session.getAttribute("user_id");

		Map<String, String> param = new HashMap<String, String>();
		param.put("isOver", isOver);
		param.put("user_email", user_email);
		
		List<ReservationVo> list = hostService.getUserReservation(param);
		
		return list;
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

	@ResponseBody
	@GetMapping("/lodging/{l_id}/detail")
	public ModelAndView gotoHostLodgingPage(@PathVariable String l_id) {
		LodgingVo vo = mainService.getLodgingDetail(l_id);
		return new ModelAndView("host/host_lodging_detail").addObject("vo", vo);
	}

	@ResponseBody
	@GetMapping("/detailView/{l_id}/{detail}")
	public ModelAndView getLodgingUpdateDetailView(@PathVariable String l_id, @PathVariable String detail) {
		LodgingVo vo = mainService.getLodgingDetail(l_id);
		String url = "";
		if ("info".equals(detail)) {
			url = "host/update/info";
		} else if ("priceDay".equals(detail)) {
			url = "host/update/priceDay";
		} else if ("forGuest".equals(detail)) {
			url = "host/update/forGuest";
		}
		return new ModelAndView(url).addObject("vo", vo);
	}

	@ResponseBody
	@PostMapping("/lodging/{l_id}/state")
	public int setLodgingState(@PathVariable String l_id, HttpServletRequest req) {
		String state = req.getParameter("state");
		HashMap<String, String> param = new HashMap<String, String>();

		param.put("l_id", l_id);
		param.put("state", state);

		return hostService.insertLodgingDel(param);
	}

	@ResponseBody
	@DeleteMapping("/lodging/{l_id}/state")
	public int delLodgingState(@PathVariable String l_id, HttpServletRequest req) {
		String state = req.getParameter("state");
		HashMap<String, String> param = new HashMap<String, String>();

		param.put("l_id", l_id);
		param.put("state", state);

		return hostService.deleteLodgingDel(param);
	}

	@ResponseBody
	@PatchMapping("/lodging/{l_id}/title")
	public int updateLodgingTitle(@PathVariable String l_id, @RequestBody LodgingVo param) {
		param.setL_id(l_id);
		param.setL_name(xssFilter(param.getL_name()));
		return hostService.setLodgingTitle(param);
	}

	@ResponseBody
	@PatchMapping("/lodging/{l_id}/guest")
	public int updateLodgingGuest(@PathVariable String l_id, @RequestBody LodgingVo param) {
		param.setL_id(l_id);
		return hostService.setLodgingGuest(param);
	}

	@ResponseBody
	@PatchMapping("/lodging/{l_id}/exp")
	public int updateLodgingState(@PathVariable String l_id, @RequestBody LodgingVo param) {
		param.setL_id(l_id);
		param.setL_exp(xssFilter(param.getL_exp()));
		return hostService.setLodgingExp(param);
	}

	@ResponseBody
	@GetMapping("/lodging/{l_id}/facility")
	public List<HashMap<String, String>> getLodgingFacilityCondition(@PathVariable String l_id) {
		return hostService.getLodgingFacilityCondition(l_id);
	}

	@ResponseBody
	@PatchMapping("/lodging/{l_id}/facility")
	public int getLodgingFacilityCondition(@PathVariable String l_id, @RequestBody LodgingVo vo) {
		vo.setL_id(l_id);
		return hostService.updateLodgingFacilityCondition(vo);
	}

	@ResponseBody
	@PatchMapping("/lodging/{l_id}/addr")
	public int updateLodgingAddr(@PathVariable String l_id, @RequestBody LodgingVo param) {
		param.setL_id(l_id);
		param.setL_addr(xssFilter(param.getL_addr()));
		return hostService.updateLodgingAddr(param);
	}

	@ResponseBody
	@PatchMapping("/lodging/{l_id}/sid")
	public int updateLodgingStruct(@PathVariable String l_id, @RequestBody LodgingVo param) {
		param.setL_id(l_id);
		return hostService.updateLodgingStruct(param);
	}

	@ResponseBody
	@PatchMapping("/lodging/{l_id}/bbb")
	public int updateLodgingBBB(@PathVariable String l_id, @RequestBody LodgingVo param) {
		param.setL_id(l_id);
		return hostService.updateLodgingBBB(param);
	}

	@ResponseBody
	@PatchMapping("/lodging/{l_id}/price")
	public int updateLodgingPrice(@PathVariable String l_id, @RequestBody LodgingVo param) {
		param.setL_id(l_id);
		return hostService.updateLodgingPrice(param);
	}

	public static String xssFilter(String str) {
		String result = "";

		result = str;
		result = result.replaceAll("[<]", "&lt;");
		result = result.replaceAll("[>]", "&gt;");

		return result;
	}

}
