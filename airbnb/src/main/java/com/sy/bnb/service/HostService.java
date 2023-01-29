package com.sy.bnb.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sy.bnb.model.LodgingVo;

public interface HostService {
	
	int hosting(LodgingVo vo);
	int hosting_facility(LodgingVo vo);
	int hosting_theme(LodgingVo vo);
	
	void saveFile(HttpServletRequest req, LodgingVo vo);
	
	List<Map<String, String>> getFacility();
	List<Map<String, String>> getTheme();
	List<Map<String, String>> getStructure();
	
	List<LodgingVo> getUserLodging(String user_email);
	
	String getHostingManage(HashMap<String, String> param);
	List<String> getHostingManage(String l_id);
	int insertHostingManage(HashMap<String, String> param);
	int deleteHostingManage(HashMap<String, String> param);

	int setLodgingTitle(LodgingVo vo);
	int setLodgingExp(LodgingVo vo);
	int setLodgingGuest(LodgingVo vo);
	
	int insertLodgingDel(HashMap<String, String> param);
	int deleteLodgingDel(HashMap<String, String> param);

	List<HashMap<String, String>> getLodgingFacilityCondition(String l_id);
	
	int updateLodgingFacilityCondition(LodgingVo vo);
	int updateLodgingAddr(LodgingVo vo);
	int updateLodgingStruct(LodgingVo vo);
	int updateLodgingBBB(LodgingVo vo);
	int updateLodgingPrice(LodgingVo vo);
}

