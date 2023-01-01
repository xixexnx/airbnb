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
		List<LodgingVo> list = mainDAO.getAllLodging();
//		FileInputStream fi = null;
//		String imgPath = "";
//		int length;
//		byte[] buffer = new byte[10];
//		
//		try {
//			for(LodgingVo vo : list) {
//				imgPath = vo.getMain_pic();
//				fi = new FileInputStream(imgPath);
//				while((length = fi.read(buffer) != -1){
//					bout.write(buffer, 0 ,length);				}
//				
//			}
//		} catch (FileNotFoundException e) {
//			e.printStackTrace();
//		}
		return list;
	}
}


