package com.sy.bnb.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.model.ReservationVo;
import com.sy.bnb.model.UserVo;

@Repository
public class MainDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public UserVo login(UserVo user) {
		return sqlSession.selectOne("login", user);
	}
	public int join(Map<String, String> param) {
		return sqlSession.insert("join", param);
	}
	public List<Map<String, String>> getTheme() {
		return sqlSession.selectList("getTheme"); 
	}
	
	public List<LodgingVo> searchForTheme(String t_id){
		return sqlSession.selectList("searchForTheme", t_id);
	}
	
	public String chkId(String inputId) {
		return sqlSession.selectOne("chkId", inputId);
	}

	public List<LodgingVo> getLodging(Map<String, String> param){
		return sqlSession.selectList("getLodging", param);
	}
	
	public List<LodgingVo> getAllLodging(){
		return sqlSession.selectList("getAllLodging");
	}

	public LodgingVo getLodgingDetail(String l_id) {
		return sqlSession.selectOne("getLodgingDetail", l_id);
	}
	
	public UserVo getUserInfo(String user_email) {
		return sqlSession.selectOne("getUserInfo", user_email);
	}
	
	public List<String> getLodgingPic(String l_id){
		return sqlSession.selectList("getLodgingPic", l_id);
	}
	
	public List<HashMap<String, String>> getFacility(String l_id){
		return sqlSession.selectList("getLodgingFacility", l_id);
	}

	public int insertReservation(ReservationVo vo) {
		return sqlSession.insert("insertReservation", vo);
	}

	public int insertReservationDetail(ReservationVo vo) {
		return sqlSession.insert("insertReservationDetail", vo);
	}
	
	public List<ReservationVo> getReservation(String user_email){
		return sqlSession.selectList("getReservation", user_email);
	}

	public List<String> getReservation_l_id(String l_id){
		return sqlSession.selectList("getImpossibleDateList", l_id);
	}
	
	public List<String> getCity_si(){
		return sqlSession.selectList("getCity_si");
	}
	
	public List<String> getCity_gu(String si){
		return sqlSession.selectList("getCity_gu", si);
	}

	public List<String> getCity_str(String str) {
		return sqlSession.selectList("searchCity", str);
	}
}
