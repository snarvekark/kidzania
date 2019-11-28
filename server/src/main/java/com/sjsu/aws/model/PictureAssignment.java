package com.sjsu.aws.model;

import java.sql.Date;

public class PictureAssignment {


	  private String username;
	  private int classnumber;
	  private String picturename;
	  private String object1;
	  private String object2;
	  private String object3;
	  private String object4;
	  private Date createddate;
	
	
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


	public String getPicturename() {
		return picturename;
	}


	public void setPicturename(String picturename) {
		this.picturename = picturename;
	}


	public String getObject1() {
		return object1;
	}


	public void setObject1(String object1) {
		this.object1 = object1;
	}


	public String getObject2() {
		return object2;
	}


	public void setObject2(String object2) {
		this.object2 = object2;
	}


	public String getObject3() {
		return object3;
	}


	public void setObject3(String object3) {
		this.object3 = object3;
	}


	public String getObject4() {
		return object4;
	}


	public void setObject4(String object4) {
		this.object4 = object4;
	}


	public Date getCreateddate() {
		return createddate;
	}


	public void setCreateddate(Date createddate) {
		this.createddate = createddate;
	}

	

	@Override
	public String toString() {
		return "PictureAssignment [username=" + username + ", classnumber=" + classnumber + ", picturename="
				+ picturename + ", object1=" + object1 + ", object2=" + object2 + ", object3=" + object3 + ", object4="
				+ object4 + ", createddate=" + createddate + "]";
	}


	
	
	
}
