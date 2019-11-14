package com.sjsu.aws.model;

import java.sql.Date;

public class UserInfo {

	private String username;
	private String profile;
	private Date createdDate;
	
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	
	@Override
	public String toString() {
		return "UserInfo [username=" + username + ", profile=" + profile + ", createdDate=" + createdDate + "]";
	}
	
	
}
