package com.sjsu.aws.model;

public class TeacherInfoAPIRequest {
	
	private String httpMethod;
	
	private String username;
	
	private TeacherInfo teacher;
	

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

	public TeacherInfo getTeacher() {
		return teacher;
	}

	public void setTeacher(TeacherInfo teacher) {
		this.teacher = teacher;
	}

	
	
	
	
}
