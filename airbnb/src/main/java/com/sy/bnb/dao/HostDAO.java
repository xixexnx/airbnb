package com.sy.bnb.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sy.bnb.model.LodgingVo;

@Repository
public class HostDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public int hosting(LodgingVo vo) {
		return sqlSession.insert("insertLodging", vo);
	}
	
	public int insertPictures(LodgingVo vo) {
		return sqlSession.insert("insertPictures", vo);
	}
	
	public int hosting_facility(LodgingVo vo) {
		return sqlSession.insert("insertLodgingFacility", vo);
	}
	
	public List<Map<String, String>> getFacility(){
		return sqlSession.selectList("getFacility");
	}

	public List<Map<String, String>> getStructure(){
		return sqlSession.selectList("getStructure");
	}
	
	public List<LodgingVo> getUserLodging(String user_email){
		return sqlSession.selectList("getUserLodging", user_email);
	}
	
}
