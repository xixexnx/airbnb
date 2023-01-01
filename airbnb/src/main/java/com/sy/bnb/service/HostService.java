package com.sy.bnb.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sy.bnb.model.LodgingVo;

public interface HostService {
	
	int hosting(LodgingVo vo);
	int hosting_facility(LodgingVo vo);
	
	void saveFile(HttpServletRequest req, LodgingVo vo);
	
	List<Map<String, String>> getFacility();
	List<Map<String, String>> getTheme();
	List<Map<String, String>> getStructure();
	
	List<LodgingVo> getUserLodging(String user_email);
}
