package com.sy.bnb.model;

import java.util.List;

public class ReservationVo {

	private String rd_id;
	private String l_id;
	private String r_id;
	private String user_email;
	private LodgingVo lodgingVo;
	private String r_date;
	private String person;
	private String t_date;
	private String start_date;
	private String finish_date;
	
	private List<String> r_date_list;

	public String getRd_id() {
		return rd_id;
	}

	public void setRd_id(String rd_id) {
		this.rd_id = rd_id;
	}

	public String getL_id() {
		return l_id;
	}

	public void setL_id(String l_id) {
		this.l_id = l_id;
	}

	public LodgingVo getLodgingVo() {
		return lodgingVo;
	}

	public void setLodgingVo(LodgingVo lodgingVo) {
		this.lodgingVo = lodgingVo;
	}
	
	public String getT_date() {
		return t_date;
	}

	public void setT_date(String t_date) {
		this.t_date = t_date;
	}

	public String getStart_date() {
		return start_date;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public String getFinish_date() {
		return finish_date;
	}

	public void setFinish_date(String finish_date) {
		this.finish_date = finish_date;
	}

	public String getR_id() {
		return r_id;
	}

	public void setR_id(String r_id) {
		this.r_id = r_id;
	}

	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}

	public String getR_date() {
		return r_date;
	}

	public void setR_date(String r_date) {
		this.r_date = r_date;
	}

	public String getPerson() {
		return person;
	}

	public void setPerson(String person) {
		this.person = person;
	}

	public List<String> getR_date_list() {
		return r_date_list;
	}

	public void setR_date_list(List<String> r_date_list) {
		this.r_date_list = r_date_list;
	}
	
	
}
