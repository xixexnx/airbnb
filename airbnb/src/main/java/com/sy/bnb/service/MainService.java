package com.sy.bnb.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.sy.bnb.model.LodgingVo;

public interface MainService {

	List<Map<String, String>> getTheme();
	Boolean chkId(String inputId);
	
	List<LodgingVo> getAllLodging();
}
