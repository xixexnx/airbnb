package com.sy.bnb.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sy.bnb.dao.MainDAO;
import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.model.ReservationVo;
import com.sy.bnb.model.UserVo;

@Service
public class MainServiceImpl implements MainService{

	@Autowired
	private MainDAO mainDAO;
	
	@Override
	public UserVo login(UserVo user) {
		return mainDAO.login(user);
	}
	
	@Override
	public int join(Map<String, String> param) {
		return mainDAO.join(param);
	}
	
	@Override
	public List<Map<String, String>> getTheme(){
		return mainDAO.getTheme();
	}
	
	@Override 
	public List<LodgingVo> searchForTheme(String t_id){
		return mainDAO.searchForTheme(t_id);
	}
	
	@Override
	public Boolean chkId(String inputId) {
		String chk = mainDAO.chkId(inputId);
		if(chk == null) {
			return true;
		}else {
			return false;
		}
	}
	
	@Override
	public List<LodgingVo> getLodging(Map<String, String> param){
		if(param.get("t_id") != null) {
			return mainDAO.searchForTheme(param.get("t_id"));
		}else if(param.get("checkIn") != null || param.get("checkOut") != null 
					|| param.get("guest_no") != null || param.get("input_val") != null){
			return mainDAO.getLodging(param);
		}else {
			return mainDAO.getAllLodging();
		}
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
		 List<HashMap<String, String>> facility_list = mainDAO.getFacility(l_id);
		 List<String> facility_list_string = new ArrayList<String>();
		 
		 for(HashMap<String, String> map : facility_list) {
			 facility_list_string.add(map.get("F_ID"));
		 }
		 
		 vo.setFacility_list_string(facility_list_string);
		 vo.setFacility_list(facility_list);
		 vo.setUserVo(user);
		 vo.setPic_path_list(pic_list);
		 return vo;
	}
	
	@Override
	public void insertReservation(ReservationVo vo) {
		mainDAO.insertReservation(vo);
		
		for(String date : vo.getR_date_list()) {
			vo.setR_date(date);
			mainDAO.insertReservationDetail(vo);
		}
	}
	
	@Override
	public List<ReservationVo> getReservation(String user_email){
		return mainDAO.getReservation(user_email);
	}
	
	@Override
	public List<String> getReservaiton_l_id(String l_id){
		return mainDAO.getReservation_l_id(l_id);
	}

	@Override
	public int deleteReservation(String[] r_id) {
		return mainDAO.deleteReservation(r_id);
	}
	
	@Override
	public List<String> getCity_si(){
		return mainDAO.getCity_si();
	}
	
	@Override
	public List<String> getCity_gu(String si){
		return mainDAO.getCity_gu(si);
	}
	
	@Override
	public List<String> getCity_str(String str) {
		return mainDAO.getCity_str(str);
	}
	
	@Override
	public List<ReservationVo> getReservationList(String user_email){
		return mainDAO.getReservationList(user_email);
	}

	@Override
	public List<ReservationVo> getReservationCancelList(String user_email){
		return mainDAO.getReservationCancelList(user_email);
	}
}


