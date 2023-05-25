package com.sy.bnb.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sy.bnb.dao.HostDAO;
import com.sy.bnb.dao.MainDAO;
import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.model.ReservationVo;

@Service
public class HostServiceImpl implements HostService{
	@Autowired
	private MainDAO mainDAO;
	
	@Autowired
	private HostDAO hostDAO;
	
	@Override
	public int hosting(LodgingVo vo) {
		return hostDAO.hosting(vo);
	}

	@Override
	public int hosting_facility(LodgingVo vo) {
		return hostDAO.hosting_facility(vo);
	}
	
	@Override
	public int hosting_theme(LodgingVo vo) {
		return hostDAO.hosting_theme(vo);
	}
	
	@Override
	public List<Map<String, String>> getFacility(){
		return hostDAO.getFacility();
	}
	
	@Override
	public List<Map<String, String>> getTheme(){
		return mainDAO.getTheme();
	}
	
	@Override
	public List<Map<String, String>> getStructure(){
		return hostDAO.getStructure();
	}
	
	@Override
	public void saveFile(HttpServletRequest req, LodgingVo vo) {
		MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) req;
		List<MultipartFile> files = multipartHttpServletRequest.getFiles("picture");
//		String path = "d:/airbnb/board";
		String path = "/upload";
		String dir_path = "";

		String main_pic_path = "";
		List<String> pic_path_list = new ArrayList<String>();
		
		for(int i=0; i<files.size(); i++) {
			MultipartFile file = files.get(i);
			dir_path = path + "/" + vo.getL_id();
			File dir = new File(dir_path);
			if(!dir.exists()) {
				dir.mkdir();
			}
			String full_path = writeFile(file, file.getOriginalFilename(), dir_path);
			
			if(i == 1) {
				main_pic_path = full_path;
			}else {
				pic_path_list.add(full_path);				
			}
		}
		
		vo.setMain_pic(main_pic_path);
		vo.setPic_path_list(pic_path_list);
		hostDAO.insertMainPicture(vo);
		hostDAO.insertPictures(vo);
	}
	
	private String writeFile(MultipartFile file, String fileName, String path){
		String full_path = path + "/" + fileName;
		byte[] data;
		FileOutputStream fos = null;
		try {
			data = file.getBytes();
			fos = new FileOutputStream(full_path);
			fos.write(data);
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return full_path;
	}
	
	@Override
	public List<ReservationVo> getUserReservation(Map<String, String> param){
		return hostDAO.getUserReservation(param);
	}
	@Override
	public List<LodgingVo> getUserLodging(String user_email) {
		return hostDAO.getUserLodging(user_email);
	}

	@Override
	public String getHostingManage(HashMap<String, String> param) {
		return hostDAO.getHostingManage(param);
	}
	
	@Override
	public List<String> getHostingManage(String l_id){
		return hostDAO.getHostingManage(l_id);
	}
	
	@Override
	public int insertHostingManage(HashMap<String, String> param) {
		return hostDAO.insertHostingManage(param);
	}
	
	@Override
	public int deleteHostingManage(HashMap<String, String> param) {
		return hostDAO.deleteHostingManage(param);
	}
	
	@Override
	public int setLodgingTitle(LodgingVo vo) {
		return hostDAO.updateLodgingTitle(vo);
	}
	
	@Override
	public int setLodgingExp(LodgingVo vo) {
		return hostDAO.updateLodgingExp(vo);
	}
	
	@Override
	public int setLodgingGuest(LodgingVo vo) {
		return hostDAO.updateLodgingGuest(vo);
	}
	
	@Override
	public int insertLodgingDel(HashMap<String, String> param) {
		return hostDAO.insertLodgingDel(param);
	}
	
	@Override
	public int deleteLodgingDel(HashMap<String, String> param) {
		return hostDAO.deleteLodgingDel(param);
	}
	
	@Override
	public List<HashMap<String, String>> getLodgingFacilityCondition(String l_id){
		return hostDAO.getLodgingFacilityCondition(l_id);
	}
	
	@Override
	public int updateLodgingFacilityCondition(LodgingVo vo) {
		List<HashMap<String, String>> ex_list_map = hostDAO.getLodgingFacilityCondition(vo.getL_id());
		List<String> new_list = vo.getFacility_list_string();
		List<String> ex_list = new ArrayList<String>();
		
		List<String> insert_list = new_list;
		List<String> delete_list = ex_list;
		
		for(HashMap<String, String> list : ex_list_map) {
			if("TRUE".equals(list.get("STATE"))) {
				ex_list.add(list.get("F_ID"));
			}
		}
		
		insert_list.removeAll(ex_list);
		delete_list.removeAll(new_list);
		
		if(insert_list.size() != 0) {
			vo.setFacility_list_string(insert_list);
			hostDAO.hosting_facility(vo);
		}
		
		if(delete_list.size() != 0) {
			vo.setFacility_list_string(delete_list);
			hostDAO.deleteLodgingFacility(vo);
		}
		
		return 1;
	}
	
	@Override
	public int updateLodgingAddr(LodgingVo vo){
		return hostDAO.updateLodgingAddr(vo);
	}
	
	@Override
	public int updateLodgingStruct(LodgingVo vo){
		return hostDAO.updateLodgingStruct(vo);
	}

	@Override
	public int updateLodgingBBB(LodgingVo vo){
		return hostDAO.updateLodgingBBB(vo);
	}
	
	@Override
	public int updateLodgingPrice(LodgingVo vo) {
		return hostDAO.updateLodgingPrice(vo);
	}
}
