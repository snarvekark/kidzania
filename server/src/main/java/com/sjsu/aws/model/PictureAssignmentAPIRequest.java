package com.sjsu.aws.model;

public class PictureAssignmentAPIRequest {

	private String httpMethod;
	
	private String username;
	private int classnumber;
	private PictureAssignment picture;

	public String getHttpMethod() {
		return httpMethod;
	}

	public void setHttpMethod(String httpMethod) {
		this.httpMethod = httpMethod;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}


	public int getClassnumber() {
		return classnumber;
	}

	public void setClassnumber(int classnumber) {
		this.classnumber = classnumber;
	}

	public PictureAssignment getPicture() {
		return picture;
	}

	public void setPicture(PictureAssignment picture) {
		this.picture = picture;
	}
	
	
	
	
}
