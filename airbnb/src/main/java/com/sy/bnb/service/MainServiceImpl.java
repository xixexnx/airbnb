package com.sy.bnb.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sy.bnb.dao.MainDAO;
import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.model.UserVo;

@Service
public class MainServiceImpl implements MainService{

	@Autowired
	private MainDAO mainDAO;
	
	@Override
	public List<Map<String, String>> getTheme(){
		return mainDAO.getTheme();
	}
	
	@Override
	public Boolean chkId(String inputId) {
		Boolean result = true;
		String chk = mainDAO.chkId(inputId);
		if("Y".equals(chk)) {
			result = false;
		}
		return result;
	}
	
	@Override
	public List<LodgingVo> getAllLodging(){
		return mainDAO.getAllLodging();
	}
	
	@Override
	public LodgingVo getLodgingDetail(String l_id) {
		 LodgingVo vo = mainDAO.getLodgingDetail(l_id);
		 UserVo user = mainDAO.getUserInfo(vo.getUser_email());
		 List<String> pic_list = mainDAO.getLodgingPic(l_id);
		 List<String> facility_list = mainDAO.getFacility(l_id);
		 vo.setFacility_list(facility_list);
		 
		 vo.setUserVo(user);
		 vo.setPic_path_list(pic_list);
		 return vo;
	}
}


