package com.sy.bnb.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.model.ReservationVo;

@Repository
public class HostDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public int hosting(LodgingVo vo) {
		return sqlSession.insert("insertLodging", vo);
	}
	
	public int insertMainPicture(LodgingVo vo) {
		return sqlSession.insert("insertMainPicture", vo);
	}
	
	public int insertPictures(LodgingVo vo) {
		return sqlSession.insert("insertPictures", vo);
	}
	
	public int hosting_facility(LodgingVo vo) {
		return sqlSession.insert("insertLodgingFacility", vo);
	}
	
	public int hosting_theme(LodgingVo vo) {
		return sqlSession.insert("insertLodgingTheme", vo);
	}
	
	public List<Map<String, String>> getFacility(){
		return sqlSession.selectList("getFacility");
	}

	public List<Map<String, String>> getStructure(){
		return sqlSession.selectList("getStructure");
	}
	
	public List<ReservationVo> getUserReservation(Map<String, String> param){
		return sqlSession.selectList("getUserReservation", param);
	}
	public List<LodgingVo> getUserLodging(String user_email){
		return sqlSession.selectList("getUserLodging", user_email);
	}
	
	public String getHostingManage(HashMap<String, String> param) {
		return sqlSession.selectOne("getHostingManage", param);
	}
	
	public List<String> getHostingManage(String l_id) {
		return sqlSession.selectList("getHostingManageList", l_id);
	}
	
	public int insertHostingManage(HashMap<String, String> param) {
		return sqlSession.insert("insertHostingManage", param);
	}
	
	public int deleteHostingManage(HashMap<String, String> param) {
		return sqlSession.delete("deleteHostingManage", param);
	}
	
	public int insertLodgingDel(HashMap<String, String> param) {
		return sqlSession.insert("insertLodgingDel", param);
	}
	
	public int deleteLodgingDel(HashMap<String, String> param) {
		return sqlSession.delete("deleteLodgingDel", param);
	}
	
	public int updateLodgingTitle(LodgingVo vo) {
		return sqlSession.update("updateLodgingTitle", vo);
	}
	
	public int updateLodgingExp(LodgingVo vo) {
		return sqlSession.update("updateLodgingExp", vo);
	}
	
	public int updateLodgingGuest(LodgingVo vo) {
		return sqlSession.update("updateLodgingGuest", vo);
	}
	
	public List<HashMap<String, String>> getLodgingFacilityCondition(String l_id){
		return sqlSession.selectList("getLodgingFacilityCondition", l_id);
	}
	
	public int deleteLodgingFacility(LodgingVo vo) {
		return sqlSession.delete("deleteLodgingFacility", vo);
	}
	
	public int updateLodgingAddr(LodgingVo vo){
		return sqlSession.update("updateLodgingAddr", vo);
	}
	
	public int updateLodgingStruct(LodgingVo vo){
		return sqlSession.update("updateLodgingStruct", vo);
	}
	
	public int updateLodgingBBB(LodgingVo vo){
		return sqlSession.update("updateLodgingBBB", vo);
	}
	
	public int updateLodgingPrice(LodgingVo vo) {
		return sqlSession.update("updateLodgingPrice", vo);
	}
}
