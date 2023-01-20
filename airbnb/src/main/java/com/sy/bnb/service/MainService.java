package com.sy.bnb.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.model.ReservationVo;
import com.sy.bnb.model.UserVo;

public interface MainService {

	UserVo login(UserVo user);
	int join(Map<String, String> param);
	List<Map<String, String>> getTheme();
	List<LodgingVo> searchForTheme(String t_id);
	Boolean chkId(String inputId);
	
	List<LodgingVo> getLodging(Map<String, String> param);
	List<LodgingVo> getAllLodging();
	LodgingVo getLodgingDetail(String l_id);
	
	void insertReservation(ReservationVo vo);
	List<ReservationVo> getReservation(String user_email);
	
	List<String> getReservaiton_l_id(String l_id);
	
	List<String> getCity_si();
	List<String> getCity_gu(String si);
	
	List<String> getCity_str(String str);
}
