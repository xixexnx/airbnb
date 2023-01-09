package com.sy.bnb.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sy.bnb.model.LodgingVo;
import com.sy.bnb.model.UserVo;

@Repository
public class MainDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<Map<String, String>> getTheme() {
		return sqlSession.selectList("getTheme"); 
	}
	
	public String chkId(String inputId) {
		return sqlSession.selectOne("chkId", inputId);
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
	
	public List<String> getFacility(String l_id){
		return sqlSession.selectList("getLodgingFacility", l_id);
	}
}
