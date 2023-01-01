package com.sy.bnb.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sy.bnb.model.LodgingVo;

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
}
