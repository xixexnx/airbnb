package com.sy.bnb.model;

import java.util.List;

public class ReservationVo {

	private String r_id;
	private String user_email;
	private String l_id;
	private String r_date;
	private String person;
	private String rd_id;
	
	private List<String> r_date_list;

	public String getRd_id() {
		return rd_id;
	}

	public void setRd_id(String rd_id) {
		this.rd_id = rd_id;
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

	public String getL_id() {
		return l_id;
	}

	public void setL_id(String l_id) {
		this.l_id = l_id;
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
