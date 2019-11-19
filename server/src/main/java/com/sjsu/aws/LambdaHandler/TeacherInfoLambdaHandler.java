package com.sjsu.aws.LambdaHandler;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Date;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.sjsu.aws.model.TeacherInfo;
import com.sjsu.aws.model.TeacherInfoAPIRequest;
import com.sjsu.aws.util.DatabaseConnection;


public class TeacherInfoLambdaHandler implements RequestHandler<TeacherInfoAPIRequest, TeacherInfo> {
	
	private Connection connection;
	
	@Override
	public TeacherInfo handleRequest(TeacherInfoAPIRequest input, Context context) {
		
		TeacherInfo teacherinfo = null;
		
		LambdaLogger logger = context.getLogger();
		
		connection = DatabaseConnection.getDBConnection();
		
		switch(input.getHttpMethod()) {
			
			case "POST":
				
				if (postTeacherInfo(input.getTeacher())) {
					
					teacherinfo = input.getTeacher();
					logger.log("POST Completed");
					break;
				}
			
			case "GET":
				
				logger.log("Inside GET");
				logger.log("before call " + input.getUsername());
				teacherinfo = getTeacherInfo(input.getUsername());
				logger.log("GET Completed");
				break;
				
		}
		return teacherinfo;
	}
	
	
	private boolean postTeacherInfo(TeacherInfo teacherinfo) {
	
		boolean result= false;
		
		try {
			
			PreparedStatement prepareStatement = connection.prepareStatement("INSERT INTO `TeacherInfo` (UserName,StoryTitle,StoryTextFile,cloudFrontTextFile,StoryPicture,Storymp3,CloudFrontmp3,CreatedDate) VALUES (?,?,?,?,?,?,?,?)");
			
			System.out.println("teacher req " + teacherinfo);
			prepareStatement.setString(1, teacherinfo.getUsername());
			prepareStatement.setString(2, teacherinfo.getStoryTitle());
			prepareStatement.setString(3, teacherinfo.getStoryTextFile());
			prepareStatement.setString(4, teacherinfo.getCloudFrontTextFile());
			prepareStatement.setString(5, teacherinfo.getStoryPicture());
			prepareStatement.setString(6, teacherinfo.getStoryMp3());
			prepareStatement.setString(7, teacherinfo.getCloudFrontmp3());
			prepareStatement.setDate(8, teacherinfo.getCreatedDate());
			
			
			int rows = prepareStatement.executeUpdate();
			System.out.println("rows after executeUpdate " + rows);
			if (rows > 0)
				result = true;
			
			
		} catch (SQLException e) {
			
			e.printStackTrace();
			System.err.format("SQL State: %s\n%s", e.getSQLState(), e.getMessage());
		}
		
		
		return result;
	}
	
	private TeacherInfo getTeacherInfo(String username) {
		
		System.out.println("username "+username);
		TeacherInfo teacherinfo = null;
		
		try {
			PreparedStatement prepareStatement = connection
					.prepareStatement("select * from `TeacherInfo` where UserName = ?");
			prepareStatement.setString(1, username);
			ResultSet rs = prepareStatement.executeQuery();
			
			if (rs.next()) {
				
				teacherinfo = new TeacherInfo();
				teacherinfo.setUsername(rs.getString("UserName"));
				teacherinfo.setStoryTitle(rs.getString("StoryTitle"));
				teacherinfo.setStoryTextFile(rs.getString("StoryTextFile"));
				teacherinfo.setCloudFrontTextFile(rs.getString("cloudFrontTextFile"));
				teacherinfo.setStoryPicture(rs.getString("StoryPicture"));
				teacherinfo.setCloudFrontmp3(rs.getString("Storymp3"));
				teacherinfo.setCloudFrontTextFile(rs.getString("CloudFrontmp3"));
				teacherinfo.setCreatedDate(rs.getDate("CreatedDate"));
				
			}
			else {
				System.out.println("rs is null");
			}

		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return teacherinfo;
	}

}
