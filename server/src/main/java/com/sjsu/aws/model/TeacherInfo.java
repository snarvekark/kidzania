package com.sjsu.aws.model;

import java.sql.Date;

public class TeacherInfo {

	private String username;
	private String storyTitle;
	private String storyTextFile;
	private String cloudFrontTextFile;
	private String storyPicture;
	private String storyMp3;
	private String cloudFrontmp3;
	private Date createdDate;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getStoryTitle() {
		return storyTitle;
	}

	public void setStoryTitle(String storyTitle) {
		this.storyTitle = storyTitle;
	}

	public String getStoryTextFile() {
		return storyTextFile;
	}

	public void setStoryTextFile(String storyTextFile) {
		this.storyTextFile = storyTextFile;
	}

	public String getCloudFrontTextFile() {
		return cloudFrontTextFile;
	}

	public void setCloudFrontTextFile(String cloudFrontTextFile) {
		this.cloudFrontTextFile = cloudFrontTextFile;
	}

	public String getStoryPicture() {
		return storyPicture;
	}

	public void setStoryPicture(String storyPicture) {
		this.storyPicture = storyPicture;
	}

	public String getStoryMp3() {
		return storyMp3;
	}

	public void setStoryMp3(String storyMp3) {
		this.storyMp3 = storyMp3;
	}

	public String getCloudFrontmp3() {
		return cloudFrontmp3;
	}

	public void setCloudFrontmp3(String cloudFrontmp3) {
		this.cloudFrontmp3 = cloudFrontmp3;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@Override
	public String toString() {
		return "TeacherInfo [username=" + username + ", storyTitle=" + storyTitle + ", storyTextFile=" + storyTextFile
				+ ", cloudFrontTextFile=" + cloudFrontTextFile + ", storyPicture=" + storyPicture + ", Storymp3="
				+ storyMp3 + ", cloudFrontmp3=" + cloudFrontmp3 + ", createdDate=" + createdDate + "]";
	}

}
