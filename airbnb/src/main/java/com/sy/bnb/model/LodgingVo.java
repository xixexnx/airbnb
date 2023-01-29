package com.sy.bnb.model;

import java.util.HashMap;
import java.util.List;

public class LodgingVo {

	private String user_email;
	private String l_id;
	private String l_name;
	private String l_addr;
	private String l_addr1;
	private String building_code;
	private String sid;
	private String checkin;
	private String checkout;
	private String bath_ea;
	private String bedroom_ea;
	private String bed_ea;
	private String l_exp;
	private String basic_person;
	private String add_person;
	private String l_state;
	
	private String basic_price;
	private String add_price;
	private String weekend_price;
	
	private UserVo userVo;
//	private List<HashMap<String, String>> facility_list;
//	private List<HashMap<String, String>> theme_list;
	
	private List<HashMap<String, String>> facility_list;
	private List<String> facility_list_string;
	private List<HashMap<String, String>> theme_list;
	private List<String> theme_list_string;
	
	private List<String> pic_path_list;
	private String main_pic;
	
	
	public String getSid() {
		return sid;
	}
	public void setSid(String sid) {
		this.sid = sid;
	}
	public String getL_state() {
		return l_state;
	}
	public void setL_state(String l_state) {
		this.l_state = l_state;
	}
	public UserVo getUserVo() {
		return userVo;
	}
	public void setUserVo(UserVo userVo) {
		this.userVo = userVo;
	}
	public String getMain_pic() {
		return main_pic;
	}
	public void setMain_pic(String main_pic) {
		this.main_pic = main_pic;
	}
	public List<String> getPic_path_list() {
		return pic_path_list;
	}
	public void setPic_path_list(List<String> pic_path_list) {
		this.pic_path_list = pic_path_list;
	}
	public String getUser_email() {
		return user_email;
	}
	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}
	public String getL_id() {
		return l_id;
	}
	public void setL_id(String l_id) {
		this.l_id = l_id;
	}
	public String getL_name() {
		return l_name;
	}
	public void setL_name(String l_name) {
		this.l_name = l_name;
	}
	public String getL_addr() {
		return l_addr;
	}
	public void setL_addr(String l_addr) {
		this.l_addr = l_addr;
	}
	public String getL_addr1() {
		return l_addr1;
	}
	public void setL_addr1(String l_addr1) {
		this.l_addr1 = l_addr1;
	}
	public String getBuilding_code() {
		return building_code;
	}
	public void setBuilding_code(String building_code) {
		this.building_code = building_code;
	}
	public String getCheckin() {
		return checkin;
	}
	public void setCheckin(String checkin) {
		this.checkin = checkin;
	}
	public String getCheckout() {
		return checkout;
	}
	public void setCheckout(String checkout) {
		this.checkout = checkout;
	}
	public String getBath_ea() {
		return bath_ea;
	}
	public void setBath_ea(String bath_ea) {
		this.bath_ea = bath_ea;
	}
	public String getBedroom_ea() {
		return bedroom_ea;
	}
	public void setBedroom_ea(String bedroom_ea) {
		this.bedroom_ea = bedroom_ea;
	}
	public String getBed_ea() {
		return bed_ea;
	}
	public void setBed_ea(String bed_ea) {
		this.bed_ea = bed_ea;
	}
	public String getL_exp() {
		return l_exp;
	}
	public void setL_exp(String l_exp) {
		this.l_exp = l_exp;
	}
	public String getBasic_person() {
		return basic_person;
	}
	public void setBasic_person(String basic_person) {
		this.basic_person = basic_person;
	}
	public String getAdd_person() {
		return add_person;
	}
	public void setAdd_person(String add_person) {
		this.add_person = add_person;
	}
	public String getBasic_price() {
		return basic_price;
	}
	public void setBasic_price(String basic_price) {
		this.basic_price = basic_price;
	}
	public String getAdd_price() {
		return add_price;
	}
	public void setAdd_price(String add_price) {
		this.add_price = add_price;
	}
	public String getWeekend_price() {
		return weekend_price;
	}
	public void setWeekend_price(String weekend_price) {
		this.weekend_price = weekend_price;
	}
	public List<String> getFacility_list_string() {
		return facility_list_string;
	}
	public void setFacility_list_string(List<String> facility_list_string) {
		this.facility_list_string = facility_list_string;
	}
//	public List<HashMap<String, String>> getTheme_list() {
//		return theme_list;
//	}
//	public void setTheme_list(List<HashMap<String, String>> theme_list) {
//		this.theme_list = theme_list;
//	}	
	public List<HashMap<String, String>> getFacility_list() {
		return facility_list;
	}
	public void setFacility_list(List<HashMap<String, String>> facility_list) {
		this.facility_list = facility_list;
	}
	public List<HashMap<String, String>> getTheme_list() {
		return theme_list;
	}
	public void setTheme_list(List<HashMap<String, String>> theme_list) {
		this.theme_list = theme_list;
	}
	public List<String> getTheme_list_string() {
		return theme_list_string;
	}
	public void setTheme_list_string(List<String> theme_list_string) {
		this.theme_list_string = theme_list_string;
	}
}
